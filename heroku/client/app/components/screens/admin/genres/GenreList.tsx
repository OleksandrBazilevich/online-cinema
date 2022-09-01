import { FC } from 'react'

import { useGenre } from './useGenre'
import { AdminNavigation } from '@/components/ui/admin-navigation/AdminNavigation'
import { AdminTable } from '@/components/ui/admin-table/AdminTable'
import { AdminHeader } from '@/components/ui/admin-table/admin-header/AdminHeader'
import { Heading } from '@/components/ui/heading/Heading'
import { Meta } from '@/utils/meta/Meta'

export const GenreList: FC = () => {
  const {
    handleSearch,
    isLoading,
    searchTerm,
    data,
    deleteAsync,
    createAsync,
  } = useGenre()

  return (
    <Meta title="Genre">
      <AdminNavigation />
      <Heading title="Genre" />
      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={createAsync}
      />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={['Name', 'Slug']}
        tableItems={data || []}
      />
    </Meta>
  )
}
