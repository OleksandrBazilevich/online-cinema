import { FC } from 'react'

import styles from './Search.module.scss'
import { SearchList } from './search-list/SearchList'
import { useSearch } from './useSearch'
import { SearchField } from '@/components/ui/search-field/SearchField'

export const Search: FC = () => {
  const { isSuccess, handleSearch, data, searchTerm } = useSearch()

  return (
    <div className={styles.wrapper}>
      <SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
      {isSuccess && <SearchList movies={data || []} />}
    </div>
  )
}
