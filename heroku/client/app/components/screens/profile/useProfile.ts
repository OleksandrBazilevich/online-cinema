import { useMutation, useQuery } from '@tanstack/react-query'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { IProfileInput } from './profile.types'
import { UserService } from '@/services/user.service'
import { toastError } from '@/utils/toast-error'

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
  const { isLoading } = useQuery(['profile'], () => UserService.getProfile(), {
    onSuccess: ({ data }) => {
      setValue('email', data.email)
      setValue('username', data.username)
      setValue('avatar', data.avatar)
    },
    onError: (error) => {
      toastError(error, 'Get profile')
    },
  })

  const { mutateAsync } = useMutation(
    ['update profile'],
    (data: IProfileInput) => UserService.updateProfile(data),
    {
      onSuccess: () => {
        toastr.success('update profile', 'update was successfully')
      },
      onError: (error) => {
        toastError(error, 'update profile')
      },
    }
  )

  const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
    await mutateAsync(data)
  }

  return { isLoading, onSubmit }
}
