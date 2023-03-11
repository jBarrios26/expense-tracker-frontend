import React from 'react';
import { Chip } from '../../../../Components/Chip';
import { RegularText } from '../../../../Components/RegularText';
import { Subtitle } from '../../../../Components/Subtitle';
import { Title } from '../../../../Components/Title';
import { classNames } from '../../../../util/classnames';
import { BudgetItemCategory } from '../../model/budget_item';

export interface BudgetInfoProps {
  name: string;
  description: string;
  totalSpending: number;
  budgetLimit: number;
  creationDate: Date;
  categories: Array<BudgetItemCategory>;
}

function BudgetInfo({
  name,
  creationDate,
  description,
  budgetLimit,
  totalSpending,
  categories,
}: BudgetInfoProps) {
  return (
    <div
      className={classNames(
        'flex flex-col rounded-lg bg-dark-blue-custom px-3 py-4 md:flex-row md:justify-between'
      )}
    >
      <div>
        <Title> {name}</Title>
        <Subtitle>
          Period:{' '}
          {creationDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </Subtitle>

        <RegularText text={description} upperPadding={true} />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="flex items-center before:mr-2 before:flex before:h-2 before:w-2 before:items-center before:rounded-full before:bg-primary-blue before:align-middle">
            Current Spending:{' '}
            <span className=" font-bold">{totalSpending}</span>
          </span>
          <span className="flex items-center before:mr-2 before:flex before:h-2 before:w-2 before:items-center before:rounded-full before:bg-orange-400 before:align-middle">
            Budget Limit: <span className="font-bold"> {budgetLimit}</span>
          </span>
        </div>
      </div>
      <div className="mt-6 md:mt-0 md:w-1/4 md:p-4">
        <p className="text-lg font-bold">Categories: </p>
        <div className="m-1 flex h-8 flex-wrap gap-2">
          {categories.length === 0 ? (
            <div className="flex flex-col  items-center justify-center">
              No categories associated to this budget
            </div>
          ) : (
            categories.map((category, index) => {
              return (
                <Chip key={index} color={category.color}>
                  {category.name}
                </Chip>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default BudgetInfo;
