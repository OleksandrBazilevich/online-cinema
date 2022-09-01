import dynamic from 'next/dynamic'
import { FC } from 'react'

import { PopularMovies } from './popular-movies/PopularMovies'

const DynamicFavoriteMovies = dynamic(
  () =>
    import('./favorite-movies/FavoriteMovies').then(
      (mod) => mod.FavoriteMovies
    ),
  {
    ssr: false,
  }
)
export const MoviesContainer: FC = () => {
  return (
    <div>
      <PopularMovies />
      <DynamicFavoriteMovies />
    </div>
  )
}
