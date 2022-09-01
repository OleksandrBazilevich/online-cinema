import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Catalog } from '@/components/screens/catalog-movies/Catalog'
import { GenreService } from '@/services/genre.service'
import { MovieService } from '@/services/movie.service'
import { IGenre, IMovie } from '@/shared/types/movie.types'

interface IGenrePage {
  movies: IMovie[]
  genre: IGenre
}

const GenrePage: NextPage<IGenrePage> = ({ movies, genre }) => {
  return (
    <Catalog
      movies={movies || []}
      title={genre.name}
      description={genre.description}
    />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: genres } = await GenreService.getAll()
    const paths = genres.map((genre) => ({
      params: { slug: genre.slug },
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
    const { data: genre } = await GenreService.getBySlug(String(params?.slug))
    const { data: movies } = await MovieService.getByGenres([genre._id])
    return {
      props: {
        movies,
        genre,
      },
      revalidate: 60
    }
  } catch (error) {
    return {
      props: {
        movies: [],
        genre: {},
      },
    }
  }
}

export default GenrePage
