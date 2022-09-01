import { GetStaticProps, NextPage } from 'next'

import { Catalog } from '@/components/screens/catalog-movies/Catalog'
import { MovieService } from '@/services/movie.service'
import { IMovie } from '@/shared/types/movie.types'

const TrendingPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
  return (
    <Catalog
      movies={movies || []}
      title="Trending movies"
      description="Best movies in excellent quality"
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const movies = await MovieService.getMostPopular()

    return {
      props: {
        movies,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      props: {
        movies: [],
      },
    }
  }
}

export default TrendingPage
