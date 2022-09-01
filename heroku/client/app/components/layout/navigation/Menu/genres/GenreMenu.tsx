import { FC } from 'react'

import { Menu } from '../Menu'

import { usePopularGenres } from './usePopularGenres'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

export const GenreMenu: FC = () => {
  const { isLoading, data } = usePopularGenres()

  return isLoading ? (
    <SkeletonLoader count={5} className="h-7 mt-6" />
  ) : (
    <Menu menu={{ title: data ? 'Popular genres' : '', items: data || [] }} />
  )
}
