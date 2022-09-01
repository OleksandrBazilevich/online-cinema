import Link from 'next/link'
import { FC } from 'react'

import { MovieItem } from '../MovieItem'

import styles from './MovieList.module.scss'
import { IMovieList } from './movie-list.types'

export const MovieList: FC<IMovieList> = ({ link, title, movies }) => {
  return (
    <div className={styles.list}>
      <div className={styles.heading}>{title}</div>
      {movies.length ? (
        movies
          .slice(0, 2)
          .map((movie) => <MovieItem movie={movie} key={movie._id} />)
      ) : (
        <div className={styles.nothing_here}>Nothing here</div>
      )}
      {movies.length ? (
        <Link href={link}>
          <a className={styles.button}>
            {link === '/trending' ? 'Trending' : 'Favorites'}
          </a>
        </Link>
      ) : (
        <Link href="/trending">
          <a className={styles.button}>Add new favorites</a>
        </Link>
      )}
    </div>
  )
}
