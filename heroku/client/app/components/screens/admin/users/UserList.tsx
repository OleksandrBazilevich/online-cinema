import { FC } from 'react'

import { useUsers } from './useUser'
import { AdminNavigation } from '@/components/ui/admin-navigation/AdminNavigation'
import { AdminTable } from '@/components/ui/admin-table/AdminTable'
import { AdminHeader } from '@/components/ui/admin-table/admin-header/AdminHeader'
import { Heading } from '@/components/ui/heading/Heading'
import { Meta } from '@/utils/meta/Meta'

export const UserList: FC = () => {
  const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers()

  return (
    <Meta title="Users">
      <AdminNavigation />
      <Heading title="Users" />
      <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={['Email', 'Date register']}
        tableItems={data || []}
      />
    </Meta>
  )
}
