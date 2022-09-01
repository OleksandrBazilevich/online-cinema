import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import { FC } from 'react'
import CountUp from 'react-countup'

import styles from '../Admin.module.scss'

import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { formatToK } from '@/utils/number/formatToK'

interface IStatCount {
  isLoading: boolean
  data: number
  description: string
  toK?: boolean
}

export const StatCounter: FC<IStatCount> = ({
  isLoading,
  data,
  description,
  toK,
}) => {
  return (
    <div className={cn(styles.block, styles.count)}>
      <div>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className={styles.number}>
            <CountUp
              formattingFn={
                toK
                  ? data
                    ? (data) => formatToK(data).toLocaleString()
                    : () => '0'
                  : null
              }
              end={data}
            />
          </div>
        )}
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  )
}
