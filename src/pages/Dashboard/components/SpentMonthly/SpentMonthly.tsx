import React, { useMemo } from 'react';
import Card from '../Card';
import { Subtitle } from '../../../../Components/Subtitle';
import { LineChart } from '../LineChart';
import { useTotalSpentByMonth } from '../../hooks/use_total_spent_month';
import { useDateSelector } from '../../hooks/use_date_selector';
import { Loader } from '../../../../Components/Loader';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import { month } from '../../../../common/model/month';

function SpentMonthly() {
  const {
    month: monthIndex,
    year,
    canGoNext,
    goToNextMonth,
    goToPreviousMonth,
  } = useDateSelector();
  const { totalSpentByMonth, isLoading } = useTotalSpentByMonth(
    year,
    monthIndex
  );

  const { data } = useMemo(() => {
    return {
      data: [
        {
          data:
            totalSpentByMonth?.expenses.map((expenses) => {
              return {
                primary: expenses.dateFormatted,
                secondary: expenses.amount,
              };
            }) ?? [],
          label: 'Amount Spent this month',
        },
      ],
    };
  }, [totalSpentByMonth?.expenses]);

  return (
    <Card className="lg:h-1/2">
      <div className="flex items-center justify-between pb-2">
        <Subtitle> Amount spent this month</Subtitle>
        <div className="flex items-center gap-2 font-bold">
          <button
            className="rounded-full hover:bg-slate-300/20"
            onClick={goToPreviousMonth}
          >
            <MdOutlineNavigateBefore size={32} />
          </button>
          {month[monthIndex]}, {year}
          {canGoNext ? (
            <button
              className="rounded-full hover:bg-slate-300/20"
              onClick={goToNextMonth}
            >
              <MdOutlineNavigateNext size={32} />
            </button>
          ) : (
            <span className=" w-8" />
          )}
        </div>
      </div>
      {isLoading ? <Loader /> : <LineChart data={data}></LineChart>}
    </Card>
  );
}

export default SpentMonthly;
