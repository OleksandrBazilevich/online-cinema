import { ChangeEvent, FC } from 'react'

import { AdminCreateButton } from './AdminCreateButton'
import styles from './AdminHeader.module.scss'
import { SearchField } from '@/ui/search-field/SearchField'

interface IAdminHeader {
  onClick?: () => void
  searchTerm: string
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

export const AdminHeader: FC<IAdminHeader> = ({
  onClick,
  searchTerm,
  handleSearch,
}) => {
  return (
    <div className={styles.header}>
      <SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
      {onClick && <AdminCreateButton onClick={onClick} />}
    </div>
  )
}
