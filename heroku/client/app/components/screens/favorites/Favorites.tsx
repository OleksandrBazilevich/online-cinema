import { FC } from 'react'

import { FavoriteItem } from './FavoriteItem'
import styles from './Favorites.module.scss'
import { useFavorites } from './useFavorites'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { Heading } from '@/components/ui/heading/Heading'
import { Meta } from '@/utils/meta/Meta'

export const Favorites: FC = () => {
  const { favoriteMovies, isLoading } = useFavorites()
  return (
    <Meta title="Favorites">
      <Heading title="Favorites" />
      <section className={styles.favorites}>
        {isLoading ? (
          <SkeletonLoader
            count={3}
            className={styles.skeletonLoader}
            containerClassName={styles.containerLoader}
          />
        ) : (
          favoriteMovies?.map((favoriteMovie) => (
            <FavoriteItem movie={favoriteMovie} key={favoriteMovie._id} />
          ))
        )}
      </section>
    </Meta>
  )
}
