import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './movie-list/MovieList.module.scss'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { widths } from '@/config/constants'
import { getGenreUrl, getMovieUrl } from '@/config/url.config'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IMovie } from '@/shared/types/movie.types'
import { getGenresListEach } from '@/utils/movie/getGenresListEach'

export const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
  const matches = useMediaQuery(`(min-width: ${widths.laptopL}px)`)

  return (
    <div className={styles.item}>
      {matches ? (
        <Link href={getMovieUrl(movie.slug)}>
          <a>
            <Image
              src={movie.poster}
              priority
              width={65}
              height={97}
              alt={movie.title}
              draggable={false}
            />
          </a>
        </Link>
      ) : null}
      <div className={styles.info}>
        <div>
          <div className={styles.title}>{movie.title}</div>
          <div className={styles.genres}>
            {movie.genres?.map((genre, idx) => (
              <Link key={genre._id} href={getGenreUrl(genre.slug)}>
                <a>{getGenresListEach(idx, movie.genres.length, genre.name)}</a>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.rating}>
          <MaterialIcon name="MdStarRate" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}
