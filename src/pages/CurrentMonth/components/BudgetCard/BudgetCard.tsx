import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Chip } from '../../../../Components/Chip';
import { classNames } from '../../../../util/classnames';
import { formatDate } from '../../../../util/format_date';
import { CurrentMonthCategories } from '../../model/current_month_budget_list_response';
export interface BudgetCardInterface {
  name: string;
  onDelete: (id: string) => void;
  topCategories: Array<CurrentMonthCategories>;
  createDate: Date;
}

function BudgetCard({
  name,
  topCategories,
  createDate,
  onDelete,
}: BudgetCardInterface) {
  return (
    <div
      className={classNames(
        'col-span-12 flex flex-col rounded-lg bg-dark-blue-custom p-3  shadow-lg md:col-span-6 lg:col-span-4 xl:col-span-3  '
      )}
    >
      <h1 className="text-3xl  font-extrabold">{name}</h1>
      <h3> Created: {formatDate(createDate)}</h3>
      <div className="mt-12 mb-4 flex h-8 flex-wrap gap-2">
        {topCategories.map((category, index) => {
          return (
            <Chip key={index} color={category.color}>
              {category.name}
            </Chip>
          );
        })}
      </div>
      <div className="flex items-center justify-between border-t-2 border-white-text p-4">
        <p className="text-lg font-semibold">Actions:</p>
        <div className="flex gap-2">
          <button
            className={classNames(
              'text-primary-blue',
              'rounded-full p-2 hover:bg-slate-50 hover:bg-opacity-10 hover:shadow-2xl'
            )}
          >
            <MdEdit size={32} />
          </button>
          <button
            onClick={() => {
              onDelete('');
            }}
            className={classNames(
              'text-primary-red',
              'rounded-full p-2 hover:bg-slate-50 hover:bg-opacity-10 hover:shadow-2xl'
            )}
          >
            <MdDelete size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;
