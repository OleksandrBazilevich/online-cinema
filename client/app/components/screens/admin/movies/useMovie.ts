import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/admin-table/admin-table.types'
import { getAdminUrl } from '@/config/url.config'
import useDebounce from '@/hooks/useDebounce'
import { MovieService } from '@/services/movie.service'
import { getGenresList } from '@/utils/movie/getGenresListEach'
import { toastError } from '@/utils/toast-error'

export const useMovie = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const { push } = useRouter()

  const queryData = useQuery(
    ['movie list', debouncedSearch],
    () => MovieService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (movie): ITableItem => ({
            _id: movie._id,
            editUrl: getAdminUrl(`movie/edit/${movie._id}`),
            items: [
              movie.title,
              getGenresList(movie.genres),
              String(movie.rating.toFixed(1)),
              String(movie.countViews),
            ],
          })
        ),
      onError: (error) => toastError(error, 'Movie list'),
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value)

  const { mutateAsync: createAsync } = useMutation(
    ['create movie', debouncedSearch],
    () => MovieService.create(),
    {
      onError: (error) => toastError(error, 'Create movie'),
      onSuccess: ({ data: _id }) => {
        toastr.success('Create movie', 'create was successfully')
        push(getAdminUrl(`movie/edit/${_id}`))
      },
    }
  )
  const { mutateAsync: deleteAsync } = useMutation(
    ['delete movie', debouncedSearch],
    (movieId: string) => MovieService.delete(movieId),
    {
      onError: (error) => toastError(error, 'Delete movie'),
      onSuccess: () => {
        toastr.success('Delete movie', 'delete was successfully')
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
