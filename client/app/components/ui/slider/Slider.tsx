import { FC, PropsWithChildren } from 'react'
import { Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'

import { SlideItem } from './SlideItem'
import styles from './Slider.module.scss'
import { ISlide } from './slider.types'

interface ISlider {
  slides: ISlide[]
  buttonTitle?: string
}

export const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      className={styles.slider}
      autoHeight
      autoplay={{
        delay: 5000,
      }}
      slidesPerView={1}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide._id}>
          <SlideItem slide={slide} buttonTitle={buttonTitle} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
