import { FC, PropsWithChildren } from 'react'

import styles from './Layout.module.scss'
import { Header } from './header/Header'
import { Navigation } from './navigation/Navigation'
import { Sidebar } from './sidebar/Sidebar'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <Header />
      <div className={styles.center}>{children}</div>
      <Sidebar />
    </div>
  )
}
