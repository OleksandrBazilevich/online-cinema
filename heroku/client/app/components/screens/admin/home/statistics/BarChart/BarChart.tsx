import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  SubTitle,
  Title,
  Tooltip,
} from 'chart.js'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import React, { FC } from 'react'
import { Bar } from 'react-chartjs-2'

import styles from './BarChart.module.scss'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { IViews } from '@/shared/types/movie.types'

dayjs.extend(localeData)

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  SubTitle
)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  borderRadius: 20,
  backgroundColor: '#990b10',
  hoverBackgroundColor: '#e30b13',
  scales: {
    x: {
      ticks: {
        font: {
          size: 18,
        },
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    y: {
      ticks: {
        font: {
          size: 18,
        },
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
  plugins: {
    tooltip: {
      displayColors: false,

      bodyFont: {
        size: 16,
      },
      callbacks: {
        title: () => '',
      },
    },

    title: {
      display: true,
      font: {
        weight: '600',
        size: 30,
      },
      color: '#fff',
      padding: {
        bottom: 10,
      },
      text: 'Total views ',
    },
    subtitle: {
      font: {
        weight: '600',
        size: 36,
      },
      color: '#990b10',
      padding: {
        bottom: 20,
      },
      display: true,
      text: '',
    },
  },
}

interface IBarChart {
  data: IViews[]
  isLoading: boolean
}

export const BarChart: FC<IBarChart> = ({ data, isLoading }) => {
  data
    ? (options.plugins.subtitle.text = `${data
        .map((item) => item.views)
        .reduce((a, b) => a + b)
        .toLocaleString()}`)
    : (options.plugins.subtitle.text = '')
  return (
    <div className={styles.chart}>
      {isLoading ? (
        <SkeletonLoader height={30} count={4} style={{ marginTop: 30 }} />
      ) : (
        <Bar
          options={options}
          data={{
            labels: data.map((item) => dayjs.monthsShort()[item.month - 1]),
            datasets: [
              {
                data: data.map((item) => item.views),
              },
            ],
          }}
        />
      )}
    </div>
  )
}
