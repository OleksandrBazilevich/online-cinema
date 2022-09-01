import { FC } from 'react'

import { Logo } from '../navigation/Logo'

import styles from './Header.module.scss'
import { BurgerMenu } from './burger-menu/BurgerMenu'

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <BurgerMenu />
    </header>
  )
}
