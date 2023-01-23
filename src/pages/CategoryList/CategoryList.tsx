import React, { useMemo } from 'react';
import { Title } from '../../Components/Title';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { BudgetCategory } from './model/budget_category';
import { classNames } from '../../util/classnames';
import { MdDelete } from 'react-icons/md';
import { useUserCategories } from './hooks/useUserCategories';
import { CategoryTable } from './components/CategoryTable';

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

  const { isLoading, isError, error, categories } = useUserCategories();

  return (
    <div className="p-4">
      <Title> Categories </Title>
      <CategoryTable
        columns={columns}
        data={categories?.categories ?? ([] as Array<BudgetCategory>)}
      ></CategoryTable>
    </div>
  );
}

export default CategoryList;
