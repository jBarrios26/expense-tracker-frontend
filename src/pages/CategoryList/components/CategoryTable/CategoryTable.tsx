import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { MdOutlineInbox } from 'react-icons/md';
import { BudgetCategory } from '../../model/budget_category';
export interface CategoryTableInterface {
  columns: ColumnDef<BudgetCategory>[];
  data: BudgetCategory[];
}

function CategoryTable({ columns, data }: CategoryTableInterface) {
  const categoryTable = useReactTable<BudgetCategory>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel<BudgetCategory>(),
  });

  return (
    <table className="w-full table-auto rounded-xl bg-dark-blue-custom p-4">
      <thead>
        {categoryTable.getHeaderGroups().map((headerGroup, index) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) =>
              flexRender(header.column.columnDef.header, header.getContext())
            )}
          </tr>
        ))}
      </thead>
      <tbody>
        {categoryTable.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="even:border-x-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        {categoryTable.getRowModel().rows.length === 0 ? (
          <tr>
            <div>
              <MdOutlineInbox size={48}></MdOutlineInbox>
            </div>
          </tr>
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
}

export default CategoryTable;
