import React from 'react';
import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';

export interface LineChartProps {
  data: {
    data: { primary: Date; secondary: number }[];
    label: string;
  }[];
}

function LineChart({ data }: LineChartProps) {
  const primaryAxis = useMemo<AxisOptions<typeof data[number]['data'][number]>>(
    () => ({
      getValue: (datum) => datum.primary as unknown as string,
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
    <div className="min-h-[300px]">
      <Chart
        className="h-[300px]"
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          tooltip: false,
          dark: true,
        }}
      />
    </div>
  );
}

export default LineChart;
