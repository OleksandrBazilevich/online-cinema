import { GetStaticProps, NextPage } from 'next'

import { Catalog } from '@/components/screens/catalog-movies/Catalog'
import { MovieService } from '@/services/movie.service'
import { IMovie } from '@/shared/types/movie.types'

const FreshPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
  return (
    <Catalog
      movies={movies || []}
      title="Fresh movies"
      description="New movies in excellent quality"
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: movies } = await MovieService.getAll()

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

export default FreshPage
