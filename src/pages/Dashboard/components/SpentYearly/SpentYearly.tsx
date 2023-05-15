import React, { useMemo } from 'react';
import Card from '../Card';
import { Subtitle } from '../../../../Components/Subtitle';
import { BarChart } from '../BarChart';
import { useDateSelector } from '../../hooks/use_date_selector';
import { useTotalSpent } from '../../hooks/use_total_spent';
import { Loader } from '../../../../Components/Loader';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

function SpentYearly() {
  const { year, canGoNext, goToNextYear, goToPreviousYear } = useDateSelector();
  const { totalSpent, isLoading } = useTotalSpent(year);

  const { data } = useMemo(() => {
    return {
      data: [
        {
          data:
            totalSpent?.expenses.map((expenses) => {
              return {
                primary: expenses.dateFormatted,
                secondary: expenses.amount,
              };
            }) ?? [],
          label: 'Amount spent this year',
        },
      ],
    };
  }, [totalSpent?.expenses]);

  return (
    <Card className="lg:h-1/2">
      <div className="flex items-center justify-between pb-2">
        <Subtitle> Amount spent this year</Subtitle>
        <div className="flex items-center gap-2 font-bold">
          <button
            className="rounded-full hover:bg-slate-300/20"
            onClick={goToPreviousYear}
          >
            <MdOutlineNavigateBefore size={32} />
          </button>
          {year}
          {canGoNext ? (
            <button
              className="rounded-full hover:bg-slate-300/20"
              onClick={goToNextYear}
            >
              <MdOutlineNavigateNext size={32} />
            </button>
          ) : (
            <span className=" w-8" />
          )}
        </div>
      </div>
      {isLoading ? <Loader /> : <BarChart data={data}></BarChart>}
    </Card>
  );
}

export default SpentYearly;
