import { FC } from 'react'

import { Logo } from './Logo'
import { MenuContainer } from './Menu/MenuContainer'
import styles from './Navigation.module.scss'

export const Navigation: FC = () => {
  return (
    <div className={styles.navigation}>
      <Logo />
      <MenuContainer />
    </div>
  )
}
