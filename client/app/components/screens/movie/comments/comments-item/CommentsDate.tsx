import dayjs from 'dayjs'
import { FC } from 'react'

import styles from '../Comments.module.scss'

import { IComment } from '@/shared/types/movie.types'

export const CommentsDate: FC<{ data: IComment }> = ({ data }) => {
  return (
    <span className={styles.date}>
      {dayjs(data.createdAt).fromNow()}
      {data.updatedAt != data.createdAt && <span> (edited)</span>}
    </span>
  )
}
