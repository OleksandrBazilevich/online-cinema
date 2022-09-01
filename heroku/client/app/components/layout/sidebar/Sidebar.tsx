import { FC } from 'react'

import styles from './Sidebar.module.scss'
import { MoviesContainer } from './movies-container/MoviesContainer'
import { Search } from './search/Search'

export const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar}>
      <Search />
      <MoviesContainer />
    </div>
  )
}
