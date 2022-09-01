import { useMutation, useQuery } from '@tanstack/react-query'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/admin-table/admin-table.types'
import { getAdminUrl } from '@/config/url.config'
import useDebounce from '@/hooks/useDebounce'
import { UserService } from '@/services/user.service'
import { convertMongoDate } from '@/utils/date/ConvertMongoDate'
import { toastError } from '@/utils/toast-error'

export const useUsers = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(
    ['user list', debouncedSearch],
    () => UserService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (user): ITableItem => ({
            _id: user._id,
            editUrl: getAdminUrl(`user/edit/${user._id}`),
            items: [user.email, convertMongoDate(user.createdAt)],
          })
        ),
      onError: (error) => toastError(error, 'User list'),
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value)

  const { mutateAsync: deleteAsync } = useMutation(
    ['delete user', debouncedSearch],
    (userId: string) => UserService.delete(userId),
    {
      onError: (error) => toastError(error, 'Delete user'),
      onSuccess: () => {
        toastr.success('Delete user', 'delete was successfully')
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
    }),
    [queryData, searchTerm, deleteAsync]
  )
}
