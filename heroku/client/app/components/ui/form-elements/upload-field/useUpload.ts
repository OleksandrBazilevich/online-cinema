import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useCallback, useMemo } from 'react'

import { FileService } from '@/services/file.service'
import { toastError } from '@/utils/toast-error'

type TypeUpload = (
  onChange: (...event: any[]) => void,
  folder?: string
) => {
  uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
  isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
  const { mutateAsync, isLoading } = useMutation(
    ['upload file'],
    (data: FormData) => FileService.upload(data, folder),
    {
      onSuccess: ({ data }) => {
        onChange(data[0].url)
      },
      onError: (error) => toastError(error, 'Uploads file'),
    }
  )

  const uploadFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files

      if (!files?.length) return

      const formData = new FormData()
      formData.append('file', files[0])

      await mutateAsync(formData)
    },
    [mutateAsync]
  )

  return useMemo(
    () => ({
      uploadFile,
      isLoading,
    }),
    [uploadFile, isLoading]
  )
}
