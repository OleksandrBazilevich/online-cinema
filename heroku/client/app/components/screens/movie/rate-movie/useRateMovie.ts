import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { useAuth } from '@/hooks/useAuth'
import { RatingService } from '@/services/rating.service'
import { toastError } from '@/utils/toast-error'

export const useRateMovie = (movieId: string) => {
  const [rating, setRating] = useState<number>(0)
  const [isSended, setIsSended] = useState<boolean>(false)

  const { user } = useAuth()
  const { refetch } = useQuery(
    ['your movie rating', movieId],
    () => RatingService.getMovieRating(movieId),
    {
      onSuccess: ({ data }) => {
        setRating(data)
      },
      onError: (error) => toastError(error, 'get rating'),
      enabled: !!movieId && !!user,
    }
  )

  const { mutateAsync, isLoading } = useMutation(
    ['set rating'],
    ({ value }: { value: number }) => RatingService.setRating(movieId, value),
    {
      onError: (error) => toastError(error, 'Rate movie	'),
      onSuccess: () => {
        setIsSended(true)
        refetch()

        if (!isLoading) {
          setTimeout(() => {
            setIsSended(false)
          }, 2000)
        }
      },
    }
  )
  const handleClick = async (nextValue: number) => {
    setRating(nextValue)
    await mutateAsync({ value: nextValue })
  }

  return {
    rating,
    isSended,
    handleClick,
  }
}
