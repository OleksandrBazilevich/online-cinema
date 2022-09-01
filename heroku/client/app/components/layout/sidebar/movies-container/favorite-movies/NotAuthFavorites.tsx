import { FC } from 'react'

import styles from './FavoriteMovies.module.scss'

export const NotAuthFavorites: FC = () => {
  return (
    <div className={styles.not_auth}>For viewing favorites pls authorize</div>
  )
}
