import React from 'react';
import { Subtitle } from '../../Components/Subtitle';
import { BarChart } from './components/BarChart';
import HorizontalBarChart from './components/HorizontalBarChart/HorizontalBarChart';
import { LastTransactions } from './components/LastTransactions';
import Card from './components/Card';
import { SpentByWeekDay } from './components/SpentByWeekDay';
import { SpentMonthly } from './components/SpentMonthly';
import { SpentYearly } from './components/SpentYearly';
import { TopCategories } from './components/TopCategories';

function Dashboard() {
  const barData = {
    data: [
      {
        data: [
          { primary: 'Lunes 10', secondary: 12 },
          {
            primary: 'Martes 10',
            secondary: 13,
          },
          {
            primary: 'Miercoles 10',
            secondary: 14,
          },
          {
            primary: 'Jueves 10',
            secondary: 9,
          },
          {
            primary: 'Viernes 10',
            secondary: 11,
          },
          {
            primary: 'Sabado 10',
            secondary: 10,
          },
          {
            primary: 'Domingo 10',
            secondary: 17,
          },
        ],
        label: 'Time line',
      },
    ],
  };

  return (
    <div className="row-auto grid w-full gap-2 p-2 first:mt-0 md:grid-cols-6 md:p-8 ">
      <div className="col-span-1 flex h-full flex-col gap-2 md:col-span-6 lg:col-span-4">
        <SpentMonthly />
        <SpentYearly />
      </div>
      <div className="col-span-1 flex h-full w-full flex-col gap-2 md:col-span-6 lg:col-span-2">
        <TopCategories />
        <SpentByWeekDay />
      </div>
      <div className=" col-span-1 md:col-span-6 lg:col-span-2">
        <LastTransactions />
      </div>
    </div>
  );
}

export default Dashboard;
