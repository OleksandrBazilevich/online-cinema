import cn from 'classnames'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import styles from '../Header.module.scss'
import { SideMenu } from '../side-menu/SideMenu'

export const BurgerMenu: FC = () => {
  const [isShow, setIsShow] = useState(false)
  const { asPath } = useRouter()

  useEffect(() => setIsShow(false), [asPath])

  return (
    <div className="relative">
      <div
        onClick={() => setIsShow(!isShow)}
        className={cn(styles.menu, {
          [styles.active]: isShow,
        })}
      >
        <span />
        <span />
        <span />
      </div>
      <SideMenu isShow={isShow} />
    </div>
  )
}
