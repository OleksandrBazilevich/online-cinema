import type { GetStaticProps, NextPage } from 'next'

import { Home } from '@/components/screens/home/Home'
import { IHome } from '@/components/screens/home/home.interface'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ISlide } from '@/components/ui/slider/slider.types'
import { getActorUrl, getMovieUrl } from '@/config/url.config'
import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'
import { shuffle } from '@/utils/array/shuffle'
import { getGenresList } from '@/utils/movie/getGenresListEach'

const HomePage: NextPage<IHome> = ({ slides, actors, trendingMovies }) => {
  return (
    <Home trendingMovies={trendingMovies} actors={actors} slides={slides} />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: movies } = await MovieService.getAll()
    const slides: ISlide[] = shuffle(movies)
      .slice(0, 4)
      .map((movie) => ({
        _id: movie._id,
        link: getMovieUrl(movie.slug),
        bigPoster: movie.bigPoster,
        subTitle: getGenresList(movie.genres),
        title: movie.title,
      }))


    const { data: actorsData } = await ActorService.getAll()
    const actors: IGalleryItem[] = actorsData.slice(0, 7).map((actor) => ({
      name: actor.name,
      posterPath: actor.photo,
      link: getActorUrl(actor.slug),
      content: {
        title: actor.name,
        subtitle: `${actor.countMovies} movies`,
      },
    }))

    const trendingMoviesData = await MovieService.getMostPopular()
    const trendingMovies: IGalleryItem[] = trendingMoviesData
      .slice(0, 7)
      .map((movie) => ({
        name: movie.title,
        posterPath: movie.poster,
        link: getMovieUrl(movie.slug),
      }))

    return {
      props: {
        slides,
        actors,
        trendingMovies,
      } as IHome,
      revalidate: 60,
    }
  } catch (error) {
    return {
      props: {
        slides: [],
        actors: [],
        trendingMovies: [],
      },
    }
  }
}

export default HomePage
