import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export type PieChartProps = {
  labels: string[];
  name: string;
  data: number[];
  labelTag: string;
};

const pieChartColors = [
  '#9b5fe0',
  '#16a4d8',
  '#60dbe8',
  '#8bd346',
  '#efdf48',
  '#f9a52c',
  '#d64e12',
];

function PieChart({ name, labels, labelTag, data: dataValues }: PieChartProps) {
  const data = useMemo(() => {
    return {
      labels: labels,
      datasets: [
        {
          label: labelTag,
          data: dataValues,
          backgroundColor: pieChartColors.map((color) => color.concat('BB')),
          borderColor: pieChartColors,
          borderWidth: 1,
        },
      ],
    };
  }, [dataValues, labelTag, labels]);

  return (
    <div className="flex min-w-full items-center justify-center py-8 px-4">
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
