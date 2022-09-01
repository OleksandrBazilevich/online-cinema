import Image from 'next/image'
import { FC } from 'react'

import styles from './Banner.module.scss'

interface IBanner {
  image: string
  Detail?: FC | null
}

export const Banner: FC<IBanner> = ({ image, Detail }) => {
  return (
    <div className={styles.banner}>
      <Image
        src={image}
        draggable={false}
        layout="fill"
        className={styles.img}
        priority
        alt=""
      />
      {Detail && <Detail />}
    </div>
  )
}
