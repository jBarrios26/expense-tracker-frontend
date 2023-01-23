import React, { useMemo, useState } from 'react';
import { Subtitle } from '../../Components/Subtitle';
import { TextField } from '../../Components/TextField';
import Title from '../../Components/Title/Title';
import { getCurrentPeriod } from '../../util/get_current_period';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { useCategories } from './hooks/useCategories';
import { Loader } from '../../Components/Loader';
import { TextArea } from '../../Components/TextArea';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton } from '../../Components/PrimaryButton';
import { TextButton } from '../../Components/TextButton';
import { MdOutlineAdd, MdRemoveCircleOutline } from 'react-icons/md';
import { classNames } from '../../util/classnames';
import { Selector } from '../../Components/Selector';
import { useCreateBudget } from './hooks/useCreateBudget';
import { LoaderOverlay } from '../../Components/LoaderOverlay';
import { SuccessDialog } from '../../Components/SuccessDialog';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../hooks/useSnackbar';
import { ErrorSnackBar } from '../../Components/ErrorSnackBar';

export interface CreateBudgetBody {
  name: string;
  amount: number;
  description: string;
  categories: Array<BudgetCategory>;
}

export interface BudgetCategory {
  categoryId: string;
  limit: number;
}

const createBudgetSchema: yup.SchemaOf<CreateBudgetBody> = yup.object().shape({
  name: yup.string().max(100).required('Budget must have a name'),
  description: yup.string().max(200).required('Budget must have a description'),
  amount: yup
    .number()
    .typeError('Amount should be a number')
    .required('You have to indicate a value')
    .min(0, 'Budget with negative amount is not possible')
    .test({
      message: 'Amount should be greater than 0',
      test: (value) => {
        if (!value) return false;
        return value > 0;
      },
    }),
  categories: yup
    .array()
    .of(
      yup.object({
        categoryId: yup
          .string()
          .required('Every expense should have a category'),
        limit: yup
          .number()
          .typeError('Amount should be a number')
          .min(0, 'Each category must have a positive limit amount')
          .required('Each category must have a limit')
          .test({
            message: 'Amount should be greater than 0',
            test: (value) => {
              if (!value) return false;
              return value > 0;
            },
          }),
      })
    )
    .test({
      message: 'You must have categories',
      test: function (categories) {
        if (!categories || categories.length === 0) {
          return false;
        }
        return true;
      },
    })
    .test({
      message: 'The sum of all category limits should be the same as budgets',
      test: function (categories) {
        if (!categories || categories.length === 0) {
          return true;
        }
        const sumOfLimit = categories
          ?.map((category) => category.limit ?? 0)
          .reduce((acc, limit) => acc + limit);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const amount = this.parent.amount ?? 0;

        if (amount === 0 || Number.isNaN(amount)) {
          return true;
        }

        return amount === sumOfLimit;
      },
    }),
});

const emptyCategory: BudgetCategory = { categoryId: '', limit: 0 };

function CreateBudget() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { isActive, openSnackBar, closeSnackBar } = useSnackbar(3000);

  const navigate = useNavigate();

  const currentPeriod = getCurrentPeriod();
  const { categories, isLoading, error, isError } = useCategories();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateBudgetBody>({
    resolver: yupResolver(createBudgetSchema),
    defaultValues: { categories: [emptyCategory], amount: 0 },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  });

  const categoriesValues = useWatch({ control, name: 'categories' });
  const totalSum = useMemo<number>(() => {
    const sum = categoriesValues
      .map((category) => {
        return category.limit;
      })
      .reduce((acc, limit) => Number(acc) + Number(limit));
    console.log(sum);
    console.log(typeof sum);

    return sum;
  }, [categoriesValues]);

  const { isLoadingCreate, mutate, errorCreate, isErrorCreate } =
    useCreateBudget(
      () => {
        setShowSuccess(true);
      },
      () => {
        openSnackBar();
      }
    );

  if (isLoading) {
    return <Loader></Loader>;
  }

  const onSubmit: SubmitHandler<CreateBudgetBody> = (data) => mutate(data);
  const onError: SubmitErrorHandler<CreateBudgetBody> = (data) =>
    console.error(data);

  return (
    <LoaderOverlay isLoading={isLoadingCreate}>
      <div className="p-4 md:mb-20 md:p-7">
        <div className="">
          <Title>Create new Budget</Title>
          <Subtitle> Period: {currentPeriod} </Subtitle>
        </div>
        <div className="mt-4">
          <form
            className="flex flex-col gap-3"
            onSubmit={(...args) =>
              void handleSubmit(onSubmit, onError)(...args)
            }
          >
            <div className="flex flex-col gap-3 md:flex-row md:gap-2">
              <TextField
                label="Name"
                id="name"
                type="text"
                error={errors.name?.message}
                register={register('name')}
              />
              <div className="md:w-1/4">
                <TextField
                  label="Amount for budget"
                  id="amount"
                  type="number"
                  error={errors.amount?.message}
                  register={register('amount')}
                />
              </div>
            </div>
            <TextArea
              label="Description"
              id="description"
              error={errors.description?.message}
              register={register('description')}
            ></TextArea>
            <div className="mb-3 flex flex-col gap-2 md:flex-row md:gap-4">
              <div className=" flex flex-col">
                <Subtitle> Budget categories</Subtitle>
                <div>Current budget planned: {totalSum}</div>
              </div>
              {errors.categories?.message !== undefined ? (
                <div className="flex items-center justify-center rounded-lg border-2 border-solid border-primary-red p-1">
                  <p className="align-middle text-base text-red-600">
                    {errors.categories?.message}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
            {fields.map((field, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full flex-col rounded-lg border-2 border-solid border-white bg-dark-blue-custom p-2 shadow-md md:border-none md:bg-inherit "
                >
                  <div
                    className={classNames(
                      'flex flex-col items-center gap-2 md:flex-row'
                    )}
                  >
                    <button
                      onClick={() => remove(index)}
                      className="flex gap-3 place-self-end text-primary-red md:place-self-center"
                    >
                      <MdRemoveCircleOutline size={24} />
                      <p className="md:hidden">Remove</p>
                    </button>
                    <Selector
                      name="categorySelector"
                      id={`categories.${index}.categoryId`}
                      label={`Category #${index + 1}`}
                      options={
                        categories !== undefined
                          ? categories?.categories.map((category) => {
                              return {
                                label: category.name,
                                value: category.id,
                                color: category.color,
                              };
                            })
                          : []
                      }
                      register={register(`categories.${index}.categoryId`)}
                    ></Selector>
                    <span className="w-full md:w-1/4">
                      <TextField
                        type="number"
                        register={register(`categories.${index}.limit`)}
                        id={`categoryLimit${index}`}
                        label={`Category limit #${index + 1}`}
                      />
                    </span>
                  </div>
                  {errors.categories !== undefined &&
                  errors.categories[index] !== undefined ? (
                    <p className="px-4 py-2 text-xs text-red-600">
                      {errors.categories[index]?.categoryId?.message}
                      {errors.categories !== undefined &&
                      errors.categories[index]?.categoryId === undefined
                        ? errors.categories[index]?.limit?.message
                        : ''}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
            <div>
              <TextButton
                name="Add more"
                onClick={function (): void {
                  append(emptyCategory);
                }}
              >
                <MdOutlineAdd /> Add more
              </TextButton>
            </div>
            <PrimaryButton
              type="submit"
              name="Create new Budget"
            ></PrimaryButton>
          </form>
        </div>
      </div>
      <SuccessDialog
        title={'Your budget was successfully created!'}
        subtitle={'Budget now should appear in budget list.!'}
        isShowing={showSuccess}
        doubleButton={false}
        onAccept={() => {
          navigate(-1);
        }}
        onDismiss={() => setShowSuccess(false)}
      ></SuccessDialog>
      <ErrorSnackBar
        message={errorCreate?.response?.data.message}
        isActive={isActive}
        onClose={closeSnackBar}
      />
    </LoaderOverlay>
  );
}

export default CreateBudget;
