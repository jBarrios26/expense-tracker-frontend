import React, { useMemo } from 'react';
import { PrimaryButton } from '../../Components/PrimaryButton';
import { TextField } from '../../Components/TextField';
import { Title } from '../../Components/Title';
import { BudgetItemCategory } from '../Budget/model/budget_item';
import Select, { SingleValue, StylesConfig } from 'react-select';
import './index.css';
import * as yup from 'yup';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RequiredNumberSchema } from 'yup/lib/number';
import { useAddExpense } from './hooks/useAddExpense';
import { useParams } from 'react-router-dom';

export interface CreateExpenseProps {
  budgetCategories: BudgetItemCategory[];
  page: number,
  size: number,
  onComplete: () => void,
}

export interface BudgetCategoryItemOption {
  label: string;
  value: string;
  color: string;
}

export interface BudgetExpenseFormShape {
  name: string;
  amount: number;
  category: string;
  date: Date;
}

function CreateExpense({ budgetCategories, page, size, onComplete }: CreateExpenseProps) {
  const {budgetId} = useParams();
  const createExpenseSchema: yup.SchemaOf<BudgetExpenseFormShape> = yup
    .object()
    .shape({
      name: yup.string().required('Expense name is required'),
      amount: yup
        .number()
        .label('Amount')
        .required('Amount is required')
        .typeError(({ label, type }) => `${label} must be of type ${type}`)
        .moreThan(0, 'Amount must be greater than 0')
        .when(
          'category',
          (category, scheme: RequiredNumberSchema<number | undefined>) => {
            const categoryItem: BudgetItemCategory | undefined =
              budgetCategories.find((option) => option.id === category);

            if (categoryItem !== undefined) {
              return yup
                .number()
                .max(
                  categoryItem.limit - categoryItem.currentSpending,
                  'You are exceeding the category limit'
                );
            }
            return scheme;
          }
        ),
      date: yup.date().required('Date is required').typeError('Invalid date'),
      category: yup.string().required('You should pick a category'),
    });

  const categoryStyles: StylesConfig<BudgetCategoryItemOption> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'bg-bg-blue',
      color: '#0368FF',
      border: 'solid white 2px',
      margin: '0',
    }),
    menu: (styles) => ({ ...styles, zIndex: 1000 }),
    menuList: (styles) => ({ ...styles, backgroundColor: '#221c3e' }),
    input: (styles) => ({
      ...styles,
      color: 'white',
      outline: 'none',
      outlineColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      ':focus': { outline: 'none', boxShadow: 'none', color: 'red' },
    }),
    option: (styles, { isSelected, isFocused, data }) => ({
      ...styles,
      color: data.color,
      fontWeight: 'bold',
      backgroundColor: isSelected
        ? '#0368FF'
        : isFocused
        ? '#0368FF5A'
        : '#221c3e',
    }),
    placeholder: (styles) => ({
      ...styles,
      backgroundColor: 'bg-bg-blue',
      color: 'white',
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      backgroundColor: 'bg-bg-blue',
      color: data.color,
      fontWeight: 'bold',
    }),
  };

  const options = useMemo<BudgetCategoryItemOption[]>(
    () =>
      budgetCategories.map((x) => {
        return { value: x.id, label: x.name, color: x.color };
      }),
    [budgetCategories]
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetExpenseFormShape>({
    resolver: yupResolver(createExpenseSchema),
    mode: 'onBlur',
  });

  const {addExpense, isError, error, isLoading} = useAddExpense(() => {
    onComplete();  
  }, page, size);

  const onSubmit: SubmitHandler<BudgetExpenseFormShape> = (data) => addExpense({
    name: data.name,
    amount: data.amount,
    date: data.date,
    category: data.category,
    budgetId: budgetId ?? '',
  });

  const onError: SubmitErrorHandler<BudgetExpenseFormShape> = (data) =>
    console.error(data);

  if (isLoading) 
    return (
      <div className="w-4/5 rounded-lg bg-dark-blue-custom px-3 py-4">
        <Title>Adding expense...</Title>
      </div>
    );

  return (
    <div className="w-4/5 rounded-lg bg-dark-blue-custom px-3 py-4">
      <Title> Add a new expense</Title>
      <form
        className="my-5 flex flex-col gap-3"
        onSubmit={(...args) => void handleSubmit(onSubmit, onError)(...args)}
      >
        <Controller
          control={control}
          render={({ field: { onChange, name, ref } }) => (
            <Select
              ref={ref}
              name={name}
              options={options}
              styles={categoryStyles}
              isMulti={false}
              onChange={(
                newValue: SingleValue<BudgetCategoryItemOption>,
                _
              ) => {
                onChange(newValue?.value);
              }}
            />
          )}
          name={'category'}
        ></Controller>
        <div className=" flex flex-col gap-4 md:flex md:flex-row">
          <div className="md:w-2/3">
            <TextField
              label={'Expense title'}
              id="name"
              register={register('name')}
              error={errors.name?.message}
            ></TextField>
          </div>
          <div className="md:w-1/3">
            <TextField
              label={'Date of Expense'}
              id="date"
              type={'date'}
              error={errors.date?.message}
              register={register('date')}
            ></TextField>
          </div>
        </div>
        <div className="">
          <TextField
            label={'Amount spent'}
            id={'amount'}
            error={errors.amount?.message}
            register={register('amount')}
          ></TextField>
        </div>
        <div className="md:flex  md:justify-center ">
          <div className="md:w-3/5">
            <PrimaryButton type={'submit'} onClick={() => console.log('add')}>
              Add expense
            </PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateExpense;
