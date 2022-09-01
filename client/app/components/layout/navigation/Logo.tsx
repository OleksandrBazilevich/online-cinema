import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Navigation.module.scss'
import logoImage from '@/assets/images/logo.svg'

export const Logo: FC = () => {
  return (
    <>
      <Link href="/">
        <a className={styles.logo}>
          <Image
            src={logoImage}
            layout="responsive"
            alt="logo"
            draggable={false}
          />
        </a>
      </Link>
    </>
  )
}
