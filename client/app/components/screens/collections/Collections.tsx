import { FC } from 'react'

import { CollectionItem } from './CollectionItem'
import styles from './Collections.module.scss'
import { ICollection } from './collections.types'
import { Description } from '@/components/ui/heading/Description/Description'
import { Heading } from '@/components/ui/heading/Heading'
import { Meta } from '@/utils/meta/Meta'

export const Collections: FC<{ collections: ICollection[] }> = ({
  collections,
}) => {
  return (
    <Meta
      title="Discovery"
      description="In this section you will find all genres in our site"
    >
      <Heading title="Discovery" className={styles.heading} />
      <Description
        text="In this section you will find all genres in our site"
        className={styles.description}
      />
      <section className={styles.collections}>
        {collections?.map((collection) => (
          <CollectionItem key={collection._id} collection={collection} />
        ))}
      </section>
    </Meta>
  )
}
