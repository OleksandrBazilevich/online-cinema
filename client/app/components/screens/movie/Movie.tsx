import dynamic from 'next/dynamic'
import { FC } from 'react'

import { IMoviePage } from '../../../../pages/movie/[slug]'

import { Comments } from './comments/Comments'
import { Content } from './content/Content'
import { useUpdateCountOpened } from './useUpdateCountOpened'
import { Banner } from '@/components/ui/banner/Banner'
import { Gallery } from '@/components/ui/gallery/Gallery'
import { SubHeading } from '@/components/ui/heading/SubHeading'
import { Meta } from '@/utils/meta/Meta'

const DynamicVideoPlayer = dynamic(
  () =>
    import('@/components/ui/video-player/VideoPlayer').then(
      (mod) => mod.VideoPlayer
    ),
  {
    ssr: false,
  }
)
const DynamicRateMovie = dynamic(
  () => import('./rate-movie/RateMovie').then((mod) => mod.RateMovie),
  {
    ssr: false,
  }
)

export const Movie: FC<IMoviePage> = ({ movie, similarMovies }) => {
  useUpdateCountOpened(movie._id)
  return (
    <Meta title={movie.title} description={`watch ${movie.title}`}>
      <Banner
        image={movie.bigPoster}
        Detail={() => <Content movie={movie} />}
      />

      <DynamicVideoPlayer slug={movie.slug} videoSource={movie.videoUrl} />

      <div className="mt-12">
        <SubHeading title="Similar" />
        <Gallery items={similarMovies} />
      </div>
      <DynamicRateMovie id={movie._id} slug={movie.slug} />

      <Comments movieId={movie._id} />
    </Meta>
  )
}
