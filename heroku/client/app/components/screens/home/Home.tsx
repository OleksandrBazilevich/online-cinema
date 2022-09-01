import { FC } from 'react'

import { IHome } from './home.interface'
import { Gallery } from '@/components/ui/gallery/Gallery'
import { GallerySlider } from '@/components/ui/gallery/GallerySlider'
import { Heading } from '@/components/ui/heading/Heading'
import { SubHeading } from '@/components/ui/heading/SubHeading'
import { Slider } from '@/components/ui/slider/Slider'
import { widths } from '@/config/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Meta } from '@/utils/meta/Meta'

export const Home: FC<IHome> = ({ slides, trendingMovies, actors }) => {
  const isLaptop = useMediaQuery(`(max-width: ${widths.laptop}px)`)
  const isTablet = useMediaQuery(`(max-width: ${widths.tablet}px)`)
  const isMobileL = useMediaQuery(`(max-width: ${widths.mobileL}px)`)

  return (
    <Meta
      title="watch movies online"
      description="watch movies and Tv shows online or stream right to your browser"
    >
      <Heading
        title="Watch movies online"
        className="text-gray-300 mb-8 text-xl"
      />
      {slides.length && <Slider slides={slides} />}

      <div className="my-10">
        <SubHeading title="Trending now" />
        {trendingMovies.length && (
          <GallerySlider
            slidesPerView={(isMobileL && 2) || (isLaptop && 3) || 5}
            autoplay={{ delay: 4000 }}
            items={trendingMovies}
          />
        )}
      </div>

      <div>
        <SubHeading title="Best actors" />
        {actors.length && (
          <GallerySlider
            slidesPerView={(isMobileL && 2) || (isLaptop && 3) || 5}
            autoplay={{ delay: 6000 }}
            items={actors}
          />
        )}
      </div>
    </Meta>
  )
}
