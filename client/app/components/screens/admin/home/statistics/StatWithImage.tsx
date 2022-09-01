import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC, ReactElement } from 'react'

import styles from '../Admin.module.scss'

import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { SubHeading } from '@/components/ui/heading/SubHeading'
import { getMovieUrl } from '@/config/url.config'
import { useAuth } from '@/hooks/useAuth'
import { MovieService } from '@/services/movie.service'
import { TypeMaterialIconName } from '@/shared/types/icon.types'
import { IMovie } from '@/shared/types/movie.types'

export interface IDataStatWithImage {
  link: string
  image?: string
  icon?: TypeMaterialIconName
}

interface IStatWithImage {
  title: string
  subTitle: string
  data: IDataStatWithImage
  isLoading: boolean
}

export const StatWithImage: FC<IStatWithImage> = ({
  isLoading,
  data,
  title,
  subTitle,
}) => {
  return (
    <div className={cn(styles.block, styles.popular)}>
      <h2>{title}</h2>
      {isLoading ? (
        <SkeletonLoader className="h-48" />
      ) : (
        data && (
          <>
            <h3>{subTitle}</h3>
            <Link href={data.link}>
              <a>
                {data.image ? (
                  <Image
                    src={data.image}
                    width={300}
                    height={400}
                    alt=""
                    className={styles.image}
                  />
                ) : (
                  <MaterialIcon name={data.icon || 'MdSyncDisabled'} />
                )}
              </a>
            </Link>
          </>
        )
      )}
    </div>
  )
}
