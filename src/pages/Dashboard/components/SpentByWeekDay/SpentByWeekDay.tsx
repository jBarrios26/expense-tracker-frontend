import React from 'react';
import { Subtitle } from '../../../../Components/Subtitle';
import { PieChart } from '../PieChart';
import Card from '../Card';
import { useSpentByDay } from '../../hooks/use_spent_by_day';
import { Loader } from '../../../../Components/Loader';
import { weekDay } from '../../../../common/model/weekday';

function SpentByWeekDay() {
  const { spentByDay, isLoading } = useSpentByDay();
  return (
    <Card className="lg:h-1/2">
      <div className="pb-2">
        <Subtitle> Amount spent each day</Subtitle>{' '}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <PieChart
          labels={
            spentByDay?.expenseInWeekList.map(
              (expense) => weekDay[expense.weekDay]
            ) ?? []
          }
          name={'Weekday'}
          data={
            spentByDay?.expenseInWeekList.map(
              (expense) => expense.spentTotal
            ) ?? []
          }
          labelTag={'Amount Spent: $'}
        ></PieChart>
      )}
    </Card>
  );
}

export default SpentByWeekDay;
