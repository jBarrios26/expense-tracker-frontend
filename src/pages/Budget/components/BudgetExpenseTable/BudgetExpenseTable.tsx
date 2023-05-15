import React, { useMemo, useState } from 'react';
import { Budget } from '../../../../model/budget';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { MdDelete, MdEdit, MdOutlineInbox } from 'react-icons/md';
import { classNames } from '../../../../util/classnames';
import { formatDate } from '../../../../util/format_date';
import { Chip } from '../../../../Components/Chip';
import { Pagination } from '../../../../Components/Pagination';
import RegularText from '../../../../Components/RegularText/RegularText';
import { PrimaryButton } from '../../../../Components/PrimaryButton';
import { Pagination as PaginationModel } from '../../../../common/model/pagination';

export interface ExpenseRow {
  expenseDate: Date;
  expenseName: string;
  expenseAmount: number;
  expenseCategory: ExpenseCategoryItem;
  id: string;
}

export interface ExpenseCategoryItem {
  name: string;
  color: string;
}

export interface BudgetExpenseTableProps {
  pages?: number;
  expenses: ExpenseRow[];
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  disableActions?: boolean;
}

function BudgetExpenseTable({
  expenses,
  pages,
  pagination,
  setPagination,
  disableActions = false,
}: BudgetExpenseTableProps) {
  const columns = useMemo<ColumnDef<ExpenseRow>[]>(
    () => [
      {
        header: (header) => (
          <th
            key={header.header.id}
            role={'columnheader'}
            className={classNames(
              'block border-b-2 p-2 text-sm sm:text-base md:table-cell md:text-2xl'
            )}
          >
            Date of Expense
          </th>
        ),
        accessorKey: 'expenseDate',
        cell: (value) => (
          <div
            className={classNames(
              '  flex items-center justify-center text-sm font-medium md:p-3 md:text-xl',
              'before:absolute before:top-0 before:left-3 before:w-5/12 before:whitespace-nowrap before:pl-4 before:font-bold before:text-white-text md:before:invisible',
              `before:content-["Expense_Date"] `
            )}
          >
            {formatDate(value.getValue<Date>())}
          </div>
        ),
      },
      {
        header: (header) => (
          <th
            scope="col"
            role={'columnheader'}
            key={header.header.id}
            className={classNames(
              'block border-b-2 p-2 text-sm sm:text-base md:table-cell md:text-2xl'
            )}
          >
            Expense
          </th>
        ),
        accessorKey: 'expenseName',
        cell: (value) => (
          <div
            className={classNames(
              '  flex items-center justify-center text-sm font-medium md:p-3 md:text-xl',
              'before:absolute before:top-0 before:left-3 before:w-5/12 before:whitespace-nowrap before:pl-4 before:font-bold before:text-white-text md:before:invisible',
              `before:content-["Expense_Name"] `
            )}
            style={{ backgroundColor: value.getValue<string>() }}
          >
            {value.getValue<string>()}
          </div>
        ),
      },
      {
        header: (header) => (
          <th
            scope="col"
            role={'columnheader'}
            key={header.header.id}
            className={classNames(
              'block border-b-2 p-2  text-sm sm:text-base md:table-cell md:text-2xl'
            )}
          >
            Amount spent
          </th>
        ),
        accessorKey: 'expenseAmount',
        cell: (value) => (
          <div
            className={classNames(
              ' flex w-full items-center justify-center text-sm font-medium md:p-3 md:text-xl',
              'before:absolute before:top-0 before:left-3 before:w-5/12 before:whitespace-nowrap before:pl-4 before:font-bold before:text-white-text md:before:invisible',
              `before:content-["Amout_spent"] `
            )}
          >
            {value.getValue<string>()}
          </div>
        ),
      },
      {
        header: (header) => (
          <th
            scope="col"
            role={'columnheader'}
            key={header.header.id}
            className={classNames(
              ' block break-words border-b-2 p-2 text-sm sm:text-base md:table-cell md:text-2xl'
            )}
          >
            Category
          </th>
        ),
        accessorKey: 'expenseCategory',
        cell: (value) => (
          <div
            className={classNames(
              ' flex items-center justify-center text-sm font-medium md:p-3 md:text-xl',
              'before:absolute before:top-0 before:left-3 before:w-5/12 before:whitespace-nowrap before:pl-4 before:font-bold before:text-white-text md:before:invisible',
              `before:content-["Category"] `
            )}
          >
            <Chip color={value.getValue<ExpenseCategoryItem>().color}>
              {value.getValue<ExpenseCategoryItem>().name}
            </Chip>
          </div>
        ),
      },
      {
        id: 'actions',
        header: (header) => (
          <th
            role={'columnheader'}
            scope="col"
            key={header.header.id}
            className={classNames(
              ' block justify-center break-words border-b-2 border-white-text p-1 text-sm   sm:p-2 sm:text-base md:table-cell md:text-2xl'
            )}
          >
            Actions
          </th>
        ),
        cell: (value) => (
          <div className="flex items-center justify-center p-3">
            {disableActions ? (
              <h3>No options available</h3>
            ) : (
              <button
                onClick={() => {
                  console.log('edit');
                }}
                className={classNames(
                  'text-primary-blue',
                  'rounded-full  hover:bg-slate-50 hover:bg-opacity-10 hover:shadow-2xl',
                  'block  text-sm font-semibold md:flex md:items-center md:justify-center md:p-3 md:text-xl'
                )}
              >
                <MdEdit size={32} />
              </button>
            )}
          </div>
        ),
      },
    ],
    []
  );

  const defaultData = React.useMemo(() => [], []);

  const table = useReactTable({
    data: expenses ?? defaultData,
    columns,
    pageCount: pages ?? 0,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  return (
    <div className={classNames('flex flex-col gap-2 pb-4')}>
      {table.getRowModel().rows.length === 0 ? (
        <div className="flex w-full flex-col items-center  justify-center p-14">
          <MdOutlineInbox size={64}></MdOutlineInbox>
          <RegularText
            text={"You haven't registers any expenses!"}
            upperPadding={false}
          ></RegularText>
          <div className="py-4">
            <PrimaryButton
              onClick={() => {
                console.log('Create expense');
              }}
              type="button"
            >
              Register an expense
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <table className="block w-full md:table md:table-auto md:rounded-xl md:bg-dark-blue-custom md:p-4 ">
          <thead className="block md:table-header-group">
            {table.getHeaderGroups().map((headerGroup, index) => (
              <tr
                key={headerGroup.id}
                className="hidden  md:static md:table-row"
              >
                {headerGroup.headers.map((header, index) =>
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )
                )}
              </tr>
            ))}
          </thead>
          <tbody className="block w-full md:table-row-group">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={
                  'my-3 block rounded-xl bg-dark-blue-custom p-4 md:my-0 md:table-row md:bg-inherit'
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="relative block pl-[50%] md:static md:table-cell md:pl-0 md:even:border-x-2"
                    role={'cell'}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        currentPage={pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        goTo={function (page: number): void {
          table.setPageIndex(page - 1);
        }}
        next={function (): void {
          if (table.getCanNextPage()) table.nextPage();
        }}
        previous={function (): void {
          if (table.getCanPreviousPage()) table.previousPage();
        }}
      ></Pagination>
    </div>
  );
}

export default BudgetExpenseTable;
