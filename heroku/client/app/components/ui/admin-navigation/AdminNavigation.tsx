import { FC } from 'react'

import styles from './AdminNavigation.module.scss'
import { AdminNavigationItem } from './AdminNavigationItem'
import { adminNavItems } from './admin-navigation.data'

export const AdminNavigation: FC = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        {adminNavItems.map((item) => (
          <AdminNavigationItem key={item.link} item={item} />
        ))}
      </ul>
    </nav>
  )
}
