import { FC } from 'react'

import { useMovie } from './useMovie'
import { AdminNavigation } from '@/components/ui/admin-navigation/AdminNavigation'
import { AdminTable } from '@/components/ui/admin-table/AdminTable'
import { AdminHeader } from '@/components/ui/admin-table/admin-header/AdminHeader'
import { Heading } from '@/components/ui/heading/Heading'
import { Meta } from '@/utils/meta/Meta'

export const MovieList: FC = () => {
  const {
    handleSearch,
    isLoading,
    searchTerm,
    data,
    deleteAsync,
    createAsync,
  } = useMovie()

  return (
    <Meta title="Movie">
      <AdminNavigation />
      <Heading title="Movie" />
      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={createAsync}
      />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={['Title', 'Genres', 'Rating', 'Views']}
        tableItems={data || []}
      />
    </Meta>
  )
}
