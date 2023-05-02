import React from 'react';
import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';

export type BarChartProps = {
  data: {
    data: { primary: string; secondary: number }[];
    label: string;
  }[];
};

function BarChart({ data }: BarChartProps) {
  const primaryAxis = useMemo<AxisOptions<typeof data[number]['data'][number]>>(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = useMemo<
    AxisOptions<typeof data[number]['data'][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <Chart
      className=" p-2 "
      options={{
        data,
        primaryAxis,
        secondaryAxes,
        tooltip: false,
        dark: true,
      }}
    />
  );
}

export default BarChart;
