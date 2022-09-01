import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, UseFormReset } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { ICommentData } from '../comments.interface'

import { CommentService } from '@/services/comment.service'
import { toastError } from '@/utils/toast-error'

export const useCommentForm = (
  movieId: string,
  reset: UseFormReset<ICommentData>
) => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(
    ['create comment'],
    (data: ICommentData) => CommentService.create(data),
    {
      onSuccess: () => {
        toastr.success('create comment', 'create was successfully')
        queryClient.invalidateQueries(['get comments'])
      },
      onError: (error) => {
        toastError(error, 'create comment')
      },
    }
  )

  const onSubmit: SubmitHandler<ICommentData> = async (data) => {
    await mutateAsync({ ...data, movieId })
    reset()
  }

  return { onSubmit }
}
