import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import styles from './Charts.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

//const labels = [
//   'Январь',
//   'Февраль',
//   'Март',
//   'Апрель',
//   'Май',
//   'Июнь',
//   'Июль',
//   'Август',
//   'Сентябрь',
//   'Октябрь',
//   'Ноябрь',
//   'Декабрь',
// ];
let monthIndex = new Date().getMonth();
let yearIndex = new Date().getFullYear();

// let monthName = labels[monthIndex];
let daysInMonth = new Date(yearIndex, monthIndex, 0).getDate();

let days = [];

for (let index = 0; index < daysInMonth.length; index++) {
  days.push(daysInMonth[index]);
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Статистика заявок и записей к врачам за ' /* + monthName */,
    },
  },
};

export const data = {
  days,
  datasets: [
    {
      fill: true,
      label: 'Заявки',
      data: days.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      fill: true,
      label: 'Записи',
      data: days.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(6, 185, 107)',
      backgroundColor: 'rgba(6, 185, 107, 0.5)',
    },
  ],
};

export default function App() {
  return (
    <div className={styles.chartsContainer}>
      <Line options={options} data={data} />
    </div>
  );
}
