import { IAdminNavItem } from './admin-navigation.types'
import { getAdminHomeUrl, getAdminUrl } from '@/config/url.config'

export const adminNavItems: IAdminNavItem[] = [
  {
    title: 'Statistic',
    link: getAdminHomeUrl(),
  },
  {
    title: 'Users',
    link: getAdminUrl('users'),
  },
  {
    title: 'Movies',
    link: getAdminUrl('movies'),
  },
  {
    title: 'Actors',
    link: getAdminUrl('actors'),
  },
  {
    title: 'Genres',
    link: getAdminUrl('genres'),
  },
]
