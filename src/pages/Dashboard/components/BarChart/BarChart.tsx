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
          defaultColors: ['#0368FFBF'],
          data,
          primaryAxis,
          secondaryAxes,
          tooltip: false,
          dark: true,
          getDatumStyle: (datum, status) => {
            return {
              rectangle: {
                backgroundColor: '#ff0000',
                stroke: 'black',
                strokeWidth: 3,
              },
              area: {
                backgroundColor: '#ff0000',
              },
              line: {
                backgroundColor: '#ff0000',
                stroke: 'black',
                strokeWidth: 3,
              },
              circle: {
                backgroundColor: '#ff0000',
                stroke: 'black',
                strokeWidth: 3,
              },
              backgroundColor: 'rgb(255,255,0)',
            };
          },
        }}
      />
    </div>
  );
}

export default BarChart;
