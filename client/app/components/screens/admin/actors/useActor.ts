import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/admin-table/admin-table.types'
import { getAdminUrl } from '@/config/url.config'
import useDebounce from '@/hooks/useDebounce'
import { ActorService } from '@/services/actor.service'
import { toastError } from '@/utils/toast-error'

export const useActor = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const { push } = useRouter()

  const queryData = useQuery(
    ['actor list', debouncedSearch],
    () => ActorService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (actor): ITableItem => ({
            _id: actor._id,
            editUrl: getAdminUrl(`actor/edit/${actor._id}`),
            items: [actor.name, String(actor.countMovies)],
          })
        ),
      onError: (error) => toastError(error, 'Actor list'),
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value)

  const { mutateAsync: createAsync } = useMutation(
    ['create actor', debouncedSearch],
    () => ActorService.create(),
    {
      onError: (error) => toastError(error, 'Create actor'),
      onSuccess: ({ data: _id }) => {
        toastr.success('Create actor', 'create was successfully')
        push(getAdminUrl(`actor/edit/${_id}`))
      },
    }
  )

  const { mutateAsync: deleteAsync } = useMutation(
    ['delete actor', debouncedSearch],
    (actorsId: string) => ActorService.delete(actorsId),
    {
      onError: (error) => toastError(error, 'Delete actors'),
      onSuccess: () => {
        toastr.success('Delete actors', 'delete was successfully')
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
