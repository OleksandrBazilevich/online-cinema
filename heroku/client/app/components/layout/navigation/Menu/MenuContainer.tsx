import { FC } from 'react'

import { Menu } from './Menu'
import { GenreMenu } from './genres/GenreMenu'
import { FirstMenu, UserMenu } from './menu.data'

export const MenuContainer: FC = () => {
  return (
    <div>
      <Menu menu={FirstMenu} />
      <GenreMenu />
      <Menu menu={UserMenu} />
    </div>
  )
}
