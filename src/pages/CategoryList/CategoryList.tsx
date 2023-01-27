/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo, useState } from 'react';
import { Title } from '../../Components/Title';
import { ColumnDef } from '@tanstack/react-table';
import { BudgetCategory } from './model/budget_category';
import { classNames } from '../../util/classnames';
import { MdAdd, MdDelete } from 'react-icons/md';
import { useUserCategories } from './hooks/useUserCategories';
import { CategoryTable } from './components/CategoryTable';
import { TextField } from '../../Components/TextField';
import { PrimaryButton } from '../../Components/PrimaryButton';
import { DropdownColorButton } from './components/DropdownColorButton';
import { useCreateCategory } from './hooks/useCreateCategory';
import * as yup from 'yup';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export interface NewCategoryShape {
  name: string;
}

const createBudgetSchema: yup.SchemaOf<NewCategoryShape> = yup.object().shape({
  name: yup.string().max(100).required('Category must have a name'),
});

function CategoryList() {
  const columns = useMemo<ColumnDef<BudgetCategory>[]>(
    () => [
      {
        header: (header) => (
          <th
            key={header.header.id}
            className={classNames('border-b-2 p-2 text-2xl')}
          >
            Name
          </th>
        ),
        accessorKey: 'name',
        cell: (value) => (
          <div className="flex items-center justify-center p-3 text-xl font-semibold">
            {value.getValue<string>()}
          </div>
        ),
      },
      {
        header: (header) => (
          <th
            key={header.header.id}
            className={classNames('w-1/5 border-b-2 p-2 text-2xl')}
          >
            Color
          </th>
        ),
        accessorKey: 'color',
        cell: (value) => (
          <div
            className="mx-5 flex items-center justify-center rounded-full p-2 text-lg font-medium"
            style={{ backgroundColor: value.getValue<string>() }}
          >
            {value.getValue<string>()}
          </div>
        ),
      },
      {
        id: 'actions',
        header: (header) => (
          <th
            key={header.header.id}
            className={classNames(
              ' w-1/6 justify-center border-b-2 border-white-text p-2 text-2xl'
            )}
          >
            Actions
          </th>
        ),
        cell: (value) => (
          <div className="flex items-center justify-center p-3">
            <button
              onClick={() => {
                console.log('delete');
              }}
              className={classNames(
                'text-primary-red',
                'rounded-full  hover:bg-slate-50 hover:bg-opacity-10 hover:shadow-2xl'
              )}
            >
              <MdDelete size={32} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCategoryShape>({
    resolver: yupResolver(createBudgetSchema),
    mode: 'onBlur',
  });

  const { categories } = useUserCategories();
  const { createCategory, isError, isLoading, error } = useCreateCategory();
  const [color, setColor] = useState('#8282ff');
  const [showDropdown, setShowDropdown] = useState(false);

  const onSubmit: SubmitHandler<NewCategoryShape> = (data) =>
    createCategory({ name: data.name, color: color });
  const onError: SubmitErrorHandler<NewCategoryShape> = (data) =>
    console.error(data);

  return (
    <div className="p-4">
      <Title> Categories </Title>

      <form
        onSubmit={(...args) => void handleSubmit(onSubmit, onError)(...args)}
        className="my-2 flex flex-col gap-4 rounded-lg bg-dark-blue-custom p-3 shadow-2xl md:flex-row"
      >
        <div className="flex items-center gap-2 md:w-full">
          <TextField
            label="Category name"
            id="name"
            register={register('name')}
            error={errors.name?.message}
          ></TextField>
          <DropdownColorButton
            show={showDropdown}
            onToggle={(next) => setShowDropdown(next)}
            color={color}
            onChangeColor={function (color: string): void {
              setColor(color);
            }}
          />
        </div>
        <div className="flex  justify-end md:w-1/3">
          <div className="">
            <PrimaryButton
              onClick={() => {
                console.log('add');
              }}
              type="submit"
            >
              <div className="flex items-center justify-center gap-2">
                <MdAdd size={24} /> Create
              </div>
            </PrimaryButton>
          </div>
        </div>
      </form>

      <CategoryTable
        columns={columns}
        data={categories?.categories ?? ([] as Array<BudgetCategory>)}
      ></CategoryTable>
    </div>
  );
}

export default CategoryList;
