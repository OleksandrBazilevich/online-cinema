import { FC } from 'react'

import { MovieList } from '../movie-list/MovieList'

import { usePopularMovies } from './usePopularMovies'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

export const PopularMovies: FC = () => {
  const { isLoading, popularMovies } = usePopularMovies()

  return isLoading ? (
    <div className="mt-11">
      <SkeletonLoader count={3} className="h-28 mb-4" />
    </div>
  ) : (
    <MovieList
      link="/trending"
      movies={popularMovies || []}
      title="Popular Movies"
    />
  )
}
