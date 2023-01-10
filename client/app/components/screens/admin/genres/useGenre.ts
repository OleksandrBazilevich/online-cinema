import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/admin-table/admin-table.types'
import { getAdminUrl } from '@/config/url.config'
import useDebounce from '@/hooks/useDebounce'
import { GenreService } from '@/services/genre.service'
import { toastError } from '@/utils/toast-error'

export const useGenre = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const { push } = useRouter()

  const queryData = useQuery(
    ['genre list', debouncedSearch],
    () => GenreService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (genre): ITableItem => ({
            _id: genre._id,
            editUrl: getAdminUrl(`genre/edit/${genre._id}`),
            items: [genre.name, genre.slug],
          })
        ),
      onError: (error) => toastError(error, 'Genre list'),
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value)

  const { mutateAsync: createAsync } = useMutation(
    ['create Genre', debouncedSearch],
    () => GenreService.create(),
    {
      onError: (error) => toastError(error, 'Create Genre'),
      onSuccess: ({ data: _id }) => {
        toastr.success('Create Genre', 'create was successfully')
        push(getAdminUrl(`genre/edit/${_id}`))
      },
    }
  )

  const { mutateAsync: deleteAsync } = useMutation(
    ['delete Genre', debouncedSearch],
    (GenreId: string) => GenreService.delete(GenreId),
    {
      onError: (error) => toastError(error, 'Delete Genre'),
      onSuccess: () => {
        toastr.success('Delete Genre', 'delete was successfully')
        queryData.refetch()
      },
    }
  )

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      deleteAsync,
      createAsync,
    }),
    [queryData, searchTerm, deleteAsync, createAsync]
  )
}
