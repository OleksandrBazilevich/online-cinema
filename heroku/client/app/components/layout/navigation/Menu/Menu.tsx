import dynamic from 'next/dynamic'
import { FC } from 'react'

import styles from './Menu.module.scss'
import { MenuItem } from './MenuItem'
import { IMenu } from './menu.types'

const DynamicAuthItems = dynamic(
  () => import('./auth/AuthItems').then((mod) => mod.AuthItems),
  {
    ssr: false,
  }
)

export const Menu: FC<{ menu: IMenu }> = ({ menu: { items, title } }) => {
  return (
    <div className={styles.menu}>
      <h2 className={styles.heading}>{title}</h2>
      <ul className={styles.ul}>
        {items.map((item) => (
          <MenuItem item={item} key={item.link} />
        ))}
        {title === 'General' ? <DynamicAuthItems /> : null}
      </ul>
    </div>
  )
}
