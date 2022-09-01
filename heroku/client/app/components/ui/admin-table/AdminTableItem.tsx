import { FC } from 'react'

import styles from './AdminTable.module.scss'
import { AdminActions } from './admin-header/admin-actions/AdminActions'
import { IAdminTableItem } from './admin-table.types'

export const AdminTableItem: FC<IAdminTableItem> = ({
  removeHandler,
  tableItem,
}) => {
  return (
    <div className={styles.item}>
      {tableItem.items.map((value) => (
        <div key={value}>{value}</div>
      ))}
      <AdminActions removeHandler={removeHandler} editUrl={tableItem.editUrl} />
    </div>
  )
}
