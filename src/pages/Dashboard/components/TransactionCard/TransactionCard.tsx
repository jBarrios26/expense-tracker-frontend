import React from 'react';
import { classNames } from '../../../../util/classnames';
import { RegularText } from '../../../../Components/RegularText';

export type TransactionCardProps = {
  color: string;
  date: string;
  name: string;
  amount: number;
};

function TransactionCard({ color, name, date, amount }: TransactionCardProps) {
  return (
    <div
      className={classNames(
        `flex w-full  items-center justify-between rounded border-l-8 bg-dark-blue-custom py-2 px-4`
      )}
      style={{ borderLeftColor: color }}
    >
      <div className="flex flex-col">
        <RegularText text={name} upperPadding={false} />
        <span className="text-sm text-gray-400"> {date}</span>
      </div>
      <div> $ {amount}</div>
    </div>
  );
}

export default TransactionCard;
