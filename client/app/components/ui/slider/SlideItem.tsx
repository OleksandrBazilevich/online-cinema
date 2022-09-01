import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

import styles from './Slider.module.scss'
import { ISlide } from './slider.types'

interface ISlideItem {
  slide: ISlide
  buttonTitle?: string
}

export const SlideItem: FC<ISlideItem> = ({ slide, buttonTitle = 'watch' }) => {
  const { push } = useRouter()
  return (
    <div className={styles.slide}>
      {slide.bigPoster && (
        <Image
          src={slide.bigPoster}
          alt={slide.title}
          layout="fill"
          draggable={false}
          priority
        />
      )}
      <div className={styles.content}>
        <div className={styles.heading}>{slide.title}</div>
        <div className={styles.subHeading}>{slide.subTitle}</div>
        <button className={styles.button} onClick={() => push(slide.link)}>
          {buttonTitle}
        </button>
      </div>
    </div>
  )
}
