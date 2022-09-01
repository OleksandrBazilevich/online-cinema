import { FC } from 'react'

import styles from './Catalog.module.scss'
import { ICatalog } from './catalog.interface'
import { GalleryItem } from '@/components/ui/gallery/GalleryItem'
import { Description } from '@/components/ui/heading/Description/Description'
import { Heading } from '@/components/ui/heading/Heading'
import { SubHeading } from '@/components/ui/heading/SubHeading'
import { getMovieUrl } from '@/config/url.config'
import { Meta } from '@/utils/meta/Meta'

export const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
  return (
    <Meta title={title} description={description}>
      <Heading title={title} className={styles.heading} />
      {description && <Description text={description} />}
      <section className={styles.movies}>
        {movies.length ? (
          movies.map((movie) => (
            <GalleryItem
              key={movie._id}
              item={{
                name: movie.title,
                link: getMovieUrl(movie.slug),
                posterPath: movie.bigPoster,
                content: {
                  title: movie.title,
                },
              }}
              variant="horizontal"
            />
          ))
        ) : (
          <SubHeading title="no data yet" />
        )}
      </section>
    </Meta>
  )
}
