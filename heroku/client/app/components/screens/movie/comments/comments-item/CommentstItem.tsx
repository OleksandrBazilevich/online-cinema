import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ChangeEvent, FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import styles from '../Comments.module.scss'
import { useComments } from '../useComments'

import { useCommentsItem } from './useCommentsItem'
import avatar from '@/assets/images/avatar.png'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { Button } from '@/components/ui/form-elements/Button'
import { Field } from '@/components/ui/form-elements/Field'
import { TextArea } from '@/components/ui/form-elements/TextArea'
import { widths } from '@/config/constants'
import { useAuth } from '@/hooks/useAuth'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IComment } from '@/shared/types/movie.types'
import { convertMongoDate } from '@/utils/date/ConvertMongoDate'
import { resizeTextArea } from '@/utils/resizeTextArea'

interface ICommentItem {
  data: IComment
  deleteComment: (_id: string) => void
  isLoading: boolean
}

dayjs.extend(relativeTime)

export const CommentsItem: FC<ICommentItem> = ({
  data,
  deleteComment,
  isLoading,
}) => {
  const DynamicDate = dynamic(
    () => import('./CommentsDate').then((mod) => mod.CommentsDate),
    { ssr: false }
  )

  const [showForm, setShowForm] = useState<boolean>(false)
  const [showSpoiler, setShowSpoiler] = useState<boolean>(false)

  const handleCancel = () => {
    setValue('body', data.body)
    setShowForm(false)
  }

  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm<{
    body: string
  }>({ mode: 'onChange' })

  const { onSubmit } = useCommentsItem(data._id, setShowForm)
  const matches = useMediaQuery(`(min-width: ${widths.mobileS}px)`)
  return (
    <div className={styles.comment}>
      {data.isSpoiler && !showSpoiler && data.user._id != user?._id ? (
        <div className={styles.spoiler}>
          <span>Be careful, this comment contains spoiler</span>
          <Button onClick={() => setShowSpoiler(true)}>Watch anyway</Button>
        </div>
      ) : (
        <>
          {!data.isSpoiler || showSpoiler || data.user._id === user?._id ? (
            <>
              {matches && (
                <div className={styles.img}>
                  <Image
                    src={data.user?.avatar || avatar}
                    layout="fill"
                    priority
                    draggable={false}
                  />
                </div>
              )}
              <div className={styles.content}>
                <div className={styles.header}>
                  <span className={styles.name}>{data.user.username}</span>
                  <DynamicDate data={data} />
                </div>
                <div className={styles.body}>
                  {showForm ? (
                    <form
                      className={styles.form}
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <TextArea
                        defaultValue={data.body}
                        {...register('body', {
                          onChange: (e) => resizeTextArea(e),
                          required: 'message is required',
                          minLength: {
                            value: 5,
                            message:
                              'message must be at least 5 characters long',
                          },
                        })}
                        error={errors.body}
                      />
                      <div className={styles.buttons}>
                        <Button>Update</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                      </div>
                    </form>
                  ) : (
                    data.body
                  )}
                </div>
              </div>
              <div className="flex h-full">
                <div className={styles.icons}>
                  {user ? (
                    user?._id === data.user._id || user.isAdmin ? (
                      showForm ? null : (
                        <>
                          <button onClick={() => setShowForm(true)}>
                            <MaterialIcon name="MdEdit" />
                          </button>
                          <button
                            onClick={() => deleteComment(data._id)}
                            disabled={isLoading}
                          >
                            <MaterialIcon name="MdDelete" />
                          </button>
                        </>
                      )
                    ) : null
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  )
}
