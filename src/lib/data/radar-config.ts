// File: src/lib/data/radar-config.ts
import type { ChartData, ChartOptions } from 'chart.js';

export const radarData: ChartData<'radar'> = {
  labels: ['Plan', 'Pattern', 'Position', 'Perspective', 'Ploy'],
  datasets: [
    {
      label: 'Design School',
      data: [5, 2, 3, 2, 1],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },
    {
      label: 'Planning School',
      data: [5, 1, 3, 2, 2],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: 'Positioning School',
      data: [4, 2, 5, 2, 4],
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    },
    {
      label: 'Entrepreneurial School',
      data: [3, 3, 3, 5, 4],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    },
    {
      label: 'Cognitive School',
      data: [2, 3, 2, 5, 1],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    },
    {
      label: 'Learning School',
      data: [2, 5, 3, 4, 2],
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1
    },
    {
      label: 'Power School',
      data: [3, 4, 4, 3, 5],
      backgroundColor: 'rgba(199, 199, 199, 0.2)',
      borderColor: 'rgba(199, 199, 199, 1)',
      borderWidth: 1
    },
    {
      label: 'Cultural School',
      data: [2, 5, 3, 5, 1],
      backgroundColor: 'rgba(255, 99, 255, 0.2)',
      borderColor: 'rgba(255, 99, 255, 1)',
      borderWidth: 1
    },
    {
      label: 'Environmental School',
      data: [1, 4, 4, 2, 2],
      backgroundColor: 'rgba(100, 200, 100, 0.2)',
      borderColor: 'rgba(100, 200, 100, 1)',
      borderWidth: 1
    },
    {
      label: 'Configuration School',
      data: [4, 4, 4, 4, 3],
      backgroundColor: 'rgba(0, 128, 255, 0.2)',
      borderColor: 'rgba(0, 128, 255, 1)',
      borderWidth: 1
    }
  ]
};

export const radarOptions: ChartOptions<'radar'> = {
  responsive: true,
  scales: {
    r: {
      beginAtZero: true,
      min: 0,
      max: 5,
      ticks: {
        stepSize: 1,
        backdropColor: 'transparent'
      }
    }
  },
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: false
    }
  }
};
