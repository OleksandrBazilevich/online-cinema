import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Catalog } from '@/components/screens/catalog-movies/Catalog'
import { Movie } from '@/components/screens/movie/Movie'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { getMovieUrl } from '@/config/url.config'
import { CommentService } from '@/services/comment.service'
import { MovieService } from '@/services/movie.service'
import { IComment, IMovie } from '@/shared/types/movie.types'

export interface IMoviePage {
  similarMovies: IGalleryItem[]
  movie: IMovie
}

const MoviePage: NextPage<IMoviePage> = ({ similarMovies, movie }) => {
  return <Movie movie={movie} similarMovies={similarMovies || []} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: movies } = await MovieService.getAll()
    const paths = movies.map((movie) => ({
      params: { slug: movie.slug },
    }))

    return {
      paths,
      fallback: 'blocking',
    }
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data: movie } = await MovieService.getBySlug(String(params?.slug))
    const { data: dataSimilarMovies } = await MovieService.getByGenres(
      movie.genres.map((genre) => genre._id)
    )
    const similarMovies: IGalleryItem[] = dataSimilarMovies
      .filter((similarMovie) => similarMovie._id != movie._id)
      .map((similarMovie) => ({
        name: similarMovie.title,
        posterPath: similarMovie.poster,
        link: getMovieUrl(similarMovie.slug),
      }))
    const queryClient = new QueryClient()

    queryClient.prefetchInfiniteQuery(['get comments'], ({ pageParam = 1 }) =>
      CommentService.getByMovieId(movie._id, pageParam)
    )

    return {
      props: {
        similarMovies,
        movie,
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      props: {
        similarMovies: [],
        movie: {},
      },
    }
  }
}

export default MoviePage
