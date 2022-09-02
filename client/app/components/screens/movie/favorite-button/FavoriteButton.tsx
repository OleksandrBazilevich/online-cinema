import { useMutation } from '@tanstack/react-query'
import cn from 'classnames'
import { FC, useEffect, useState } from 'react'

import { useFavorites } from '../../favorites/useFavorites'

import styles from './FavoriteButton.module.scss'
import heartImage from './heart-animation.png'
import { UserService } from '@/services/user.service'
import { toastError } from '@/utils/toast-error'

export const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
  const [isSmashed, setIsSmashed] = useState<boolean>(false)

  const { favoriteMovies, refetch } = useFavorites()

  useEffect(() => {
    if (!favoriteMovies) return

    const isHasMovie = favoriteMovies.some(
      (favoriteMovie) => favoriteMovie._id === movieId
    )

    if (isSmashed != isHasMovie) setIsSmashed(isHasMovie)
  }, [favoriteMovies, isSmashed, movieId])

  const { mutateAsync } = useMutation(
    ['update favorites'],
    () => UserService.toggleFavorites(movieId),
    {
      onError: (error) => toastError(error, 'Update favorite list'),
      onSuccess: () => {
        setIsSmashed(!isSmashed)
        refetch()
      },
    }
  )

  return (
    <button
      aria-label='make it favorite'
      onClick={() => mutateAsync()}
      className={cn(styles.button, {
        [styles.animate]: isSmashed,
      })}
      style={{ backgroundImage: `url(${heartImage.src})` }}
    />
  )
}
