import { FC } from 'react'

import { MovieList } from '../movie-list/MovieList'

import { NotAuthFavorites } from './NotAuthFavorites'
import { useFavorites } from '@/components/screens/favorites/useFavorites'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { useAuth } from '@/hooks/useAuth'

export const FavoriteMovies: FC = () => {
  const { favoriteMovies, isLoading } = useFavorites()
  const { user } = useAuth()
  if (!user) return <NotAuthFavorites />

  return isLoading ? (
    <div className="mt-11">
      <SkeletonLoader count={3} className="h-28 mb-4" />
    </div>
  ) : (
    <MovieList
      link="favorites"
      title="Your favorites"
      movies={favoriteMovies?.reverse() || []}
    />
  )
}
