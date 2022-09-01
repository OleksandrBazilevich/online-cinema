import { useQuery } from '@tanstack/react-query'

import { MovieService } from '@/services/movie.service'

export const usePopularMovies = () => {
  const {
    isLoading,
    refetch,
    data: popularMovies,
  } = useQuery(['Popular movies in sidebar'], () =>
    MovieService.getMostPopular()
  )

  return { isLoading, refetch, popularMovies }
}
