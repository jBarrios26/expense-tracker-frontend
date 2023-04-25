import React, { ReactElement, ReactNode } from 'react';
import { classNames } from '../../util/classnames';

function Dashboard() {
  return (
    <div className="row-auto grid gap-2 p-2 first:mt-0 md:grid-cols-6 md:p-8 ">
      <div className="col-span-1 flex flex-col gap-2 md:col-span-6 lg:col-span-4">
        <Card className="h-36">Hola mundo 1</Card>
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
        'w-full rounded-lg bg-dark-blue-custom py-2 px-2',
        `${props.className ?? ''}`
      )}
    >
      {props.children}
    </div>
  );
}

export default Dashboard;
