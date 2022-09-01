import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { usePopularMovies } from '@/components/layout/sidebar/movies-container/popular-movies/usePopularMovies'
import { useAuth } from '@/hooks/useAuth'
import { MovieService } from '@/services/movie.service'
import { ViewsService } from '@/services/views.service'

export const useUpdateCountOpened = (movieId: string) => {
  const { user } = useAuth()
  const { refetch: updateSideBarPopular } = usePopularMovies()
  const { mutateAsync } = useMutation(['set views'], () =>
    ViewsService.updateViews(movieId)
  )

  useEffect(() => {
    if (user) mutateAsync().then(() => updateSideBarPopular())
  }, [])
}
