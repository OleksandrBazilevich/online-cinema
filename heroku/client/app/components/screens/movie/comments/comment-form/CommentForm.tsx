import dynamic from 'next/dynamic'
import { ComponentType, FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import styles from '../Comments.module.scss'
import { ICommentData } from '../comments.interface'

import { useCommentForm } from './useCommentForm'
import { Button } from '@/components/ui/form-elements/Button'
import { TextArea } from '@/components/ui/form-elements/TextArea'
import { ITextArea } from '@/components/ui/form-elements/form.types'
import { resizeTextArea } from '@/utils/resizeTextArea'

export const CommentForm: FC<{ movieId: string }> = ({ movieId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ICommentData>({ mode: 'onChange' })

  const { onSubmit } = useCommentForm(movieId, reset)

  return (
    <form className={styles.add_form} onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        placeholder="message"
        {...register('body', {
          onChange: (e) => resizeTextArea(e),
          required: 'message is required',
          minLength: {
            value: 5,
            message: 'message must be at least 5 characters long',
          },
        })}
        error={errors.body}
      />
      <div className={styles.actions}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            defaultChecked={false}
            {...register('isSpoiler')}
          />
          <span>is spoiler ?</span>
        </label>
        <Button>Create</Button>
      </div>
    </form>
  )
}
