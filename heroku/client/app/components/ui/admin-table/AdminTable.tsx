import { FC } from 'react'

import { SkeletonLoader } from '../SkeletonLoader'

import styles from './AdminTable.module.scss'
import { AdminTableHeader } from './AdminTableHeader'
import { AdminTableItem } from './AdminTableItem'
import { ITableItem } from './admin-table.types'

interface IAdminTable {
  tableItems: ITableItem[]
  isLoading: boolean
  headerItems: string[]
  removeHandler: (id: string) => void
}

export const AdminTable: FC<IAdminTable> = ({
  tableItems,
  isLoading,
  headerItems,
  removeHandler,
}) => {
  return (
    <div>
      <AdminTableHeader headerItems={headerItems} />
      {isLoading ? (
        <SkeletonLoader count={4} height={48} className="mt-4" />
      ) : tableItems.length ? (
        tableItems.map((tableItem) => (
          <AdminTableItem
            tableItem={tableItem}
            removeHandler={() => removeHandler(tableItem._id)}
            key={tableItem._id}
          />
        ))
      ) : (
        <div className={styles.notFound}>Elements not found</div>
      )}
    </div>
  )
}
