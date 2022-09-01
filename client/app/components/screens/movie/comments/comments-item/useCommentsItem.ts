import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { CommentService } from '@/services/comment.service'
import { toastError } from '@/utils/toast-error'

export const useCommentsItem = (_id, setIsShow) => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(
    ['update comment'],
    (data: { body: string }) => CommentService.update(_id, data),
    {
      onSuccess: () => {
        toastr.success('update comment', 'update was successfully')
        queryClient.invalidateQueries(['get comments'])
      },
      onError: (error) => {
        toastError(error, 'update comment')
      },
    }
  )

  const onSubmit: SubmitHandler<{ body: string }> = async (data) => {
    await mutateAsync(data)
    setIsShow(false)
  }

  return { onSubmit }
}
