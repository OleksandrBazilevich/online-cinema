import { FC } from 'react'

import { useActor } from './useActor'
import { AdminNavigation } from '@/components/ui/admin-navigation/AdminNavigation'
import { AdminTable } from '@/components/ui/admin-table/AdminTable'
import { AdminHeader } from '@/components/ui/admin-table/admin-header/AdminHeader'
import { Heading } from '@/components/ui/heading/Heading'
import { Meta } from '@/utils/meta/Meta'

export const ActorList: FC = () => {
  const {
    handleSearch,
    isLoading,
    searchTerm,
    data,
    deleteAsync,
    createAsync,
  } = useActor()

  return (
    <Meta title="Actors">
      <AdminNavigation />
      <Heading title="Actors" />
      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={createAsync}
      />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={['Name', 'Amount of movies']}
        tableItems={data || []}
      />
    </Meta>
  )
}
