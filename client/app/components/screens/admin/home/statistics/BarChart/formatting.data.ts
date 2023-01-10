import { IViews } from '@/shared/types/movie.types'

export const formateData = (data: IViews[]) => {
  let formattedData: IViews[] = [
    { month: 1, views: 0 },
    { month: 2, views: 0 },
    { month: 3, views: 0 },
    { month: 4, views: 0 },
    { month: 5, views: 0 },
    { month: 6, views: 0 },
    { month: 7, views: 0 },
    { month: 8, views: 0 },
    { month: 9, views: 0 },
    { month: 10, views: 0 },
    { month: 11, views: 0 },
    { month: 12, views: 0 },
  ]
  if (data === undefined) return formattedData
  for (let i = 0; i < data.length; i++) {
    for (let j = i; j < formattedData.length; j++) {
      if (
        data[i].views != undefined &&
        formattedData[j].month === data[i].month
      ) {
        formattedData[j] = data[i]
      }
    }
  }
  return formattedData
}
