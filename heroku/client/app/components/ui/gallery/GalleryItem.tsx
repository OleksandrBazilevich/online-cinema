import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Gallery.module.scss'
import { IGalleryItemProps } from './gallery.interface'

export const GalleryItem: FC<IGalleryItemProps> = ({
  item,
  variant,
  isSlider,
}) => {
  return (
    <Link href={item.link}>
      <a
        className={cn(styles.item, {
          [styles.withText]: item.content,
          [styles.horizontal]: variant === 'horizontal',
          [styles.vertical]: variant === 'vertical',
          [styles.slide]: isSlider,
        })}
      >
        <Image
          src={item.posterPath}
          alt={item.name}
          layout="fill"
          draggable={false}
          priority
        />
        {item.content && (
          <div className={styles.content}>
            <div className={styles.title}>{item.content.title}</div>
            {item.content.subtitle && (
              <div className={styles.subTitle}>{item.content.subtitle}</div>
            )}
          </div>
        )}
      </a>
    </Link>
  )
}
