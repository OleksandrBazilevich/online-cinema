import { FC } from 'react'

import styles from '../Admin.module.scss'

import { BarChart } from './BarChart/BarChart'
import { StatCounter } from './StatCounter'
import { StatWithImage } from './StatWithImage'
import { useStatistics } from './useStatistics'
import { formatToK } from '@/utils/number/formatToK'

export const Statistics: FC = () => {
  const { data, loadings } = useStatistics()
  return (
    <div className={styles.statistics}>
      <div className={styles.wrapper}>
        <StatCounter
          isLoading={loadings.isTotalMoviesCountLoading}
          data={data.totalMoviesCount}
          description="Total movies"
          toK
        />
        <StatCounter
          isLoading={loadings.isTotalGenresCountLoading}
          data={data.totalGenresCount}
          description="Total genres"
          toK
        />
        <StatCounter
          isLoading={loadings.isTotalActorsCountLoading}
          data={data.totalActorsCount}
          description="Total actors"
          toK
        />
        <StatCounter
          isLoading={loadings.isCountUserLoading}
          data={data.countUser}
          description="Total users"
          toK
        />
      </div>
      <BarChart
        isLoading={loadings.isAllViewsByMonthLoading}
        data={data.allViewsByMonth}
      />
      <div className={styles.wrapper}>
        <StatWithImage
          isLoading={loadings.isPopularMovieLoading}
          data={data.popularMovie}
          title="The most popular"
          subTitle={`${formatToK(data.popularMovie?.countViews)} times opened`}
        />
        <StatWithImage
          isLoading={loadings.isBestMovieLoading}
          data={data.bestMovie}
          title="The best movie"
          subTitle={`average rating is ${data.bestMovie?.rating}`}
        />
        <StatWithImage
          isLoading={loadings.isBestActorLoading}
          data={data.bestActor}
          title="The best actor"
          subTitle={`total movies ${data.bestActor?.countMovies}`}
        />
        <StatWithImage
          isLoading={loadings.isBestGenreLoading}
          data={data.bestGenre}
          title="The best genre"
          subTitle={`total movies ${data.bestGenre?.moviesCount}`}
        />
      </div>
    </div>
  )
}
