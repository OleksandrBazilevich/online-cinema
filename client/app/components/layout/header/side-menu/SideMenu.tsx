import cn from 'classnames'
import { FC } from 'react'

import { MenuContainer } from '../../navigation/Menu/MenuContainer'
import { Search } from '../../sidebar/search/Search'
import styles from '../Header.module.scss'

export const SideMenu: FC<{ isShow: boolean }> = ({ isShow }) => {
  return (
    <div
      className={cn(styles.side_menu, {
        [styles.active]: isShow,
      })}
    >
      <ul>
        <div className="px-5">
          <Search />
        </div>
        <MenuContainer />
      </ul>
    </div>
  )
}
