import React, { ReactNode } from 'react';
import { classNames } from '../../util/classnames';
import { LineChart } from './components/LineChart';
import { Subtitle } from '../../Components/Subtitle';
import { BarChart } from './components/BarChart';
import HorizontalBarChart from './components/HorizontalBarChart/HorizontalBarChart';
import { PieChart } from './components/PieChart';
import { LastTransactions } from './components/LastTransactions';
import Card from './components/Card';
import { SpentByWeekDay } from './components/SpentByWeekDay';

function Dashboard() {
  const { data } = {
    data: [
      {
        data: [
          { primary: new Date(Date.parse('2023-04-28')), secondary: 12 },
          {
            primary: new Date(Date.parse('2023-04-28') + 1 * 24 * 3600 * 1000),
            secondary: 13,
          },
          {
            primary: new Date(Date.parse('2023-04-28') + 2 * 24 * 3600 * 1000),
            secondary: 14,
          },
          {
            primary: new Date(Date.parse('2023-04-28') + 3 * 24 * 3600 * 1000),
            secondary: 9,
          },
          {
            primary: new Date(Date.parse('2023-04-28') + 4 * 24 * 3600 * 1000),
            secondary: 11,
          },
          {
            primary: new Date(Date.parse('2023-04-28') + 5 * 24 * 3600 * 1000),
            secondary: 10,
          },
          {
            primary: new Date(Date.parse('2023-04-28') + 6 * 24 * 3600 * 1000),
            secondary: 17,
          },
          {
            primary: new Date(Date.parse('2023-04-28') + 7 * 24 * 3600 * 1000),
            secondary: 13,
          },
          {
            primary: new Date(Date.parse('2023-04-28') + 8 * 24 * 3600 * 1000),
            secondary: 7,
          },
          {
            primary: new Date(Date.parse('2023-04-28') + 9 * 24 * 3600 * 1000),
            secondary: 3,
          },
        ],
        label: 'Time line',
      },
    ],
  };

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
        <Card className="lg:h-1/2">
          <Subtitle> Amount spent this month</Subtitle>
          <LineChart data={data}></LineChart>
        </Card>
        <Card className="lg:h-1/2">
          <Subtitle> Amount spent this year</Subtitle>
          <BarChart data={barData.data}></BarChart>
        </Card>
      </div>
      <div className="col-span-1 flex h-full w-full flex-col gap-2 md:col-span-6 lg:col-span-2">
        <Card className="lg:h-1/2">
          <Subtitle> Top categories </Subtitle>
          <HorizontalBarChart
            labels={['Manga', 'Abril']}
            data={[1, 4]}
            name="Top categories"
            colors={'#0368FF80'}
          ></HorizontalBarChart>{' '}
        </Card>
        <SpentByWeekDay />
      </div>
      <div className=" col-span-1 md:col-span-6 lg:col-span-2">
        <LastTransactions />
      </div>
    </div>
  );
}

export default Dashboard;
