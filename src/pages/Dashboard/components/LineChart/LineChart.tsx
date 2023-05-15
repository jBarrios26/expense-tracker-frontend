import React from 'react';
import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';

export interface LineChartProps {
  data: {
    data: { primary: Date | string; secondary: number }[];
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
        min: 0,
      },
    ],
    []
  );

  return (
    <div className="min-h-[400px] lg:min-h-[90%]">
      <Chart
        className="h-[400px] lg:min-h-[90%]"
        options={{
          data,
          defaultColors: ['#0368FFBF'],
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
