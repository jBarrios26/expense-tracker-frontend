import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface HorizontalBarChartProps {
  labels: string[];
  data: number[];
  colors: string[] | '#0368FF80';
  name: string;
}

export default function HorizontalBarChart({
  colors,
  data: dataValues,
  name,
  labels,
}: HorizontalBarChartProps) {
  const options = useMemo(() => {
    return {
      indexAxis: 'y' as const,
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      scales: {
        y: {
          border: { color: 'white' },
        },
        x: {
          grid: {
            color: '#FFFFFF2F',
            borderColor: 'grey',
            tickColor: 'grey',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: name,
        },
      },

      maintainAspectRatio: false,
    };
  }, [name]);

  const data = {
    labels,
    datasets: [
      {
        axis: 'y',
        label: name,
        data: dataValues,
        borderColor: colors,
        backgroundColor: colors,
      },
    ],
  };
  return (
    <div className="h-[90%]">
      <Bar options={options} data={data} />
    </div>
  );
}
