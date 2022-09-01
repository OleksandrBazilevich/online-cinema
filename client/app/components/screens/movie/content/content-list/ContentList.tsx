import Link from 'next/link'
import { FC, Fragment } from 'react'

import { IContentList } from '../content.interface'

import styles from './ContentList.module.scss'

export const ContentList: FC<IContentList> = ({ links, name }) => {
  return (
    <div className={styles.list}>
      <div className={styles.name}>{name}</div>
      <div className={styles.links}>
        {links?.map((link, index) => (
          <Fragment key={link._id}>
            <Link href={link.link}>
              <a>{link.title}</a>
            </Link>
            {index + 1 === links.length ? '' : ',  '}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
