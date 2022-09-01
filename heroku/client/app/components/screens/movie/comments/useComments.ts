import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { toastr } from 'react-redux-toastr'

import { CommentService } from '@/services/comment.service'
import { toastError } from '@/utils/toast-error'

export const useComments = (movieId: string) => {
  const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
    useInfiniteQuery(
      ['get comments'],
      ({ pageParam = 1 }) => CommentService.getByMovieId(movieId, pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.data.nextId,
        enabled: !!movieId,
      }
    )

  const { mutateAsync: deleteAsync, isLoading: isDeleteLoading } = useMutation(
    ['delete comment'],
    (_id: string) => CommentService.delete(_id),
    {
      onSuccess: () => {
        refetchComment()
        toastr.success('Comment', 'comment deleted successfully')
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )

  const queryClient = useQueryClient()

  const refetchComment = async () => {
    await queryClient.invalidateQueries(['get comments'])
    refetch()
  }
  return useMemo(
    () => ({
      data,
      fetchNextPage,
      hasNextPage,
      isLoading,
      deleteAsync,
      isDeleteLoading,
    }),
    [data, fetchNextPage, hasNextPage, isLoading, deleteAsync, isDeleteLoading]
  )
}
