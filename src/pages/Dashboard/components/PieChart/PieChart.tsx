import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export type PieChartProps = {
  labels: string[];
  name: string;
  data: number[];
  labelTag: string;
  colors: string[];
};

function PieChart({
  name,
  labels,
  labelTag,
  data: dataValues,
  colors,
}: PieChartProps) {
  const data = useMemo(() => {
    return {
      labels: labels,
      datasets: [
        {
          label: labelTag,
          data: dataValues,
          backgroundColor: colors.map((color) => color.concat('33')),
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    };
  }, [colors, dataValues, labelTag, labels]);

  return (
    <div className="flex min-w-full items-center justify-center">
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
