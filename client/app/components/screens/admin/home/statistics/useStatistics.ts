import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { IDataStatWithImage } from './StatWithImage'
import { getActorUrl, getGenreUrl, getMovieUrl } from '@/config/url.config'
import { ActorService } from '@/services/actor.service'
import { AdminService } from '@/services/admin.service'
import { GenreService } from '@/services/genre.service'
import { MovieService } from '@/services/movie.service'
import { IMovie } from '@/shared/types/movie.types'

export const useStatistics = () => {
  const { isLoading: isTotalViewsCountLoading, data: totalViews } = useQuery(
    ['all views count'],
    () => AdminService.getTotalViews(),
    {
      select: ({ data }) => data,
    }
  )
  const { isLoading: isCountUserLoading, data: countUser } = useQuery(
    ['count users'],
    () => AdminService.getCountUsers(),
    {
      select: ({ data }) => data,
    }
  )

  const { isLoading: isAllViewsByMonthLoading, data: allViewsByMonth } =
    useQuery(
      ['get all views by month'],
      () => AdminService.getAllViewsByMonth(),
      {
        select: ({ data }) => data,
      }
    )

  const { isLoading: isBestMovieLoading, data: bestMovie } = useQuery(
    ['best movie in admin'],
    () => MovieService.getBestMovies(),
    {
      select: ({ data }) => ({
        ...data[0],
        link: getMovieUrl(data[0].slug),
        image: data[0].poster,
      }),
    }
  )

  const { isLoading: isPopularMovieLoading, data: popularMovie } = useQuery(
    ['most popular movie in admin'],
    () => MovieService.getMostPopular(),
    {
      select: (data) => ({
        ...data[0],
        link: getMovieUrl(data[0].slug),
        image: data[0].poster,
      }),
    }
  )

  const { isLoading: isBestGenreLoading, data: bestGenre } = useQuery(
    ['best genre in admin'],
    () => GenreService.getBest(),
    {
      select: ({ data }) => ({
        ...data,
        link: getGenreUrl(data.slug),
        icon: data.icon,
      }),
    }
  )

  const { isLoading: isTotalMoviesCountLoading, data: totalMoviesCount } =
    useQuery(['total count movies in admin'], () => MovieService.getAll(), {
      select: ({ data }) => data.length,
    })

  const { isLoading: isTotalGenresCountLoading, data: totalGenresCount } =
    useQuery(['total count genres in admin'], () => GenreService.getAll(), {
      select: ({ data }) => data.length,
    })

  const { isLoading: isTotalActorsCountLoading, data: totalActorsCount } =
    useQuery(['total count actors in admin'], () => ActorService.getAll(), {
      select: ({ data }) => data.length,
    })

  const { isLoading: isBestActorLoading, data: bestActor } = useQuery(
    ['best actor in admin'],
    () => ActorService.getBestActor(),
    {
      select: ({ data }) => ({
        ...data,
        link: getActorUrl(data.slug),
        image: data.photo,
      }),
    }
  )
  return useMemo(
    () => ({
      loadings: {
        isTotalViewsCountLoading,
        isCountUserLoading,
        isBestMovieLoading,
        isBestActorLoading,
        isPopularMovieLoading,
        isTotalMoviesCountLoading,
        isTotalGenresCountLoading,
        isTotalActorsCountLoading,
        isBestGenreLoading,
        isAllViewsByMonthLoading,
      },
      data: {
        totalViews,
        countUser,
        bestMovie,
        popularMovie,
        totalMoviesCount,
        totalGenresCount,
        totalActorsCount,
        bestActor,
        bestGenre,
        allViewsByMonth,
      },
    }),
    [
      isTotalViewsCountLoading,
      isAllViewsByMonthLoading,
      isCountUserLoading,
      isBestMovieLoading,
      isPopularMovieLoading,
      isTotalMoviesCountLoading,
      isTotalGenresCountLoading,
      isTotalActorsCountLoading,
      isBestGenreLoading,
      isBestActorLoading,
      totalViews,
      countUser,
      bestMovie,
      bestActor,
      bestGenre,
      popularMovie,
      totalMoviesCount,
      totalGenresCount,
      totalActorsCount,
      allViewsByMonth,
    ]
  )
}
