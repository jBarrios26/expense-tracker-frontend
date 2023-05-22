import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { HiOutlineEye } from 'react-icons/hi';
import { Chip } from '../Chip';
import { classNames } from '../../util/classnames';
import { formatDate } from '../../util/format_date';
import { CurrentMonthCategories } from '../../pages/CurrentMonth/model/current_month_budget_list_response';
import { useNavigate } from 'react-router-dom';
export interface BudgetCardInterface {
  name: string;
  id: string;
  onDelete: (id: string) => void;
  topCategories: Array<CurrentMonthCategories>;
  createDate: Date;
  isHistoryDetail?: boolean;
}

function BudgetCard({
  name,
  id,
  topCategories,
  createDate,
  onDelete,
  isHistoryDetail = false,
}: BudgetCardInterface) {
  const navigation = useNavigate();
  return (
    <div
      className={classNames(
        'col-span-12 flex flex-col justify-between gap-7 rounded-lg bg-dark-blue-custom  p-3 shadow-lg md:col-span-6 lg:col-span-4 xl:col-span-3  '
      )}
    >
      <div>
        <h1 className="text-3xl  font-extrabold">{name}</h1>
        <h3> Created: {formatDate(createDate)}</h3>
      </div>
      <div className="flex flex-col gap-3">
        <div className="min-h-8 flex flex-wrap gap-2">
          {topCategories.map((category, index) => {
            return (
              <Chip key={index} color={category.color}>
                {category.name}
              </Chip>
            );
          })}
        </div>
        <div className="flex items-center justify-between border-t-2 border-white-text p-1">
          <p className="text-lg font-semibold">Actions:</p>
          <div className="flex gap-2">
            <button
              type="button"
              className={classNames(
                'text-white-text',
                'rounded-full p-2 hover:bg-slate-50 hover:bg-opacity-10 hover:shadow-2xl'
              )}
              onClick={() =>
                isHistoryDetail
                  ? navigation(`/home/budget-history/${id}`)
                  : navigation(`/home/budget/${id}`)
              }
            >
              <HiOutlineEye size={32} />
            </button>
            {isHistoryDetail ? (
              <></>
            ) : (
              <div>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;
