import { FC } from 'react'

import { Statistics } from './statistics/Statistics'
import { AdminNavigation } from '@/components/ui/admin-navigation/AdminNavigation'
import { Heading } from '@/components/ui/heading/Heading'
import { Meta } from '@/utils/meta/Meta'

export const Admin: FC = () => {
  return (
    <Meta title="Admin panel">
      <AdminNavigation />
      <Heading title="Some statistics" />
      <Statistics />
    </Meta>
  )
}
