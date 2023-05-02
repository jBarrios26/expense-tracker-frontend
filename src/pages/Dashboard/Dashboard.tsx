import React, { ReactElement, ReactNode } from 'react';
import { classNames } from '../../util/classnames';
import { LineChart } from './components/LineChart';
import { Subtitle } from '../../Components/Subtitle';

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
  return (
    <div className="row-auto grid gap-2 p-2 first:mt-0 md:grid-cols-6 md:p-8 ">
      <div className="col-span-1 flex h-full flex-col gap-2 md:col-span-6 lg:col-span-4">
        <Card>
          <Subtitle> Amount spent this month</Subtitle>
          <div className="">
            <LineChart data={data}></LineChart>
          </div>
        </Card>
        <Card className=" h-80">Hola mundo 2</Card>
      </div>
      <div className="col-span-1 flex h-full w-full flex-col gap-2 md:col-span-6 lg:col-span-2">
        <Card className="lg:h-1/2">Hola mundo 3</Card>
        <Card className="lg:h-1/2">Hola mundo 4</Card>
      </div>
      <Card className=" col-span-1 md:col-span-6 lg:col-span-2">
        Hola mundo 5
      </Card>
    </div>
  );
}

function Card(props: { children: ReactNode; className?: string }) {
  return (
    <div
      className={classNames(
        'w-full rounded-lg bg-dark-blue-custom py-5 px-4',
        `${props.className ?? ''}`
      )}
    >
      {props.children}
    </div>
  );
}

export default Dashboard;
