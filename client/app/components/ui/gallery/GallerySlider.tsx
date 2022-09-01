import { FC } from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { GalleryItem } from './GalleryItem'
import { IGalleryItem } from './gallery.interface'

interface IGallerySlider {
  items: IGalleryItem[]
  autoplay: boolean | { delay: number }
  slidesPerView: number
}

export const GallerySlider: FC<IGallerySlider> = ({
  items,
  autoplay,
  slidesPerView,
}) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={autoplay}
      slidesPerView={slidesPerView}
    >
      {items.map((item) => (
        <SwiperSlide className="mr-3 last:mr-0" key={item.link}>
          <GalleryItem isSlider item={item} variant="vertical" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
