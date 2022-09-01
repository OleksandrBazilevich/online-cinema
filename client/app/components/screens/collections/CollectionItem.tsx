import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'

import { CollectionImg } from './CollectionImg'
import styles from './Collections.module.scss'
import { ICollection } from './collections.types'
import { getGenreUrl } from '@/config/url.config'

export const CollectionItem: FC<{ collection: ICollection }> = ({
  collection,
}) => {
  return (
    <Link href={getGenreUrl(collection.slug)}>
      <a className={styles.collection}>
        <CollectionImg collection={collection} />
        <div className={styles.content}>
          <div className={styles.title}>{collection.title}</div>
        </div>
        <div className={cn(styles.behind, styles.second)}>
          <CollectionImg collection={collection} />
        </div>
        <div className={cn(styles.behind, styles.third)}>
          <CollectionImg collection={collection} />
        </div>
      </a>
    </Link>
  )
}
