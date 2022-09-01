import { IMenu } from './menu.types'

export const FirstMenu: IMenu = {
  title: 'Menu',
  items: [
    {
      icon: 'MdHome',
      link: '/',
      title: 'Home',
    },
    {
      icon: 'MdExplore',
      link: '/genres',
      title: 'Discovery',
    },
    {
      icon: 'MdRefresh',
      link: '/fresh',
      title: 'Fresh movies',
    },
    {
      icon: 'MdLocalFireDepartment',
      link: '/trending',
      title: 'Trending now',
    },
  ],
}

export const UserMenu: IMenu = {
  title: 'General',
  items: [],
}

export const menus: IMenu[] = [FirstMenu, UserMenu]
