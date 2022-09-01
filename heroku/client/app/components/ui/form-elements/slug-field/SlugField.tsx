import { CSSProperties, FC } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

import { Field } from '../Field'

import styles from './SlugField.module.scss'

interface ISlugField {
  error?: FieldError
  register: UseFormRegister<any>
  generate: () => void
  Style?: CSSProperties
}

export const SlugField: FC<ISlugField> = ({
  error,
  register,
  generate,
  Style,
}) => {
  return (
    <div className="relative" style={Style || {}}>
      <Field
        {...register('slug', {
          required: 'slug is required',
        })}
        placeholder="Slug"
        error={error}
      />
      <div className={styles.badge} onClick={generate}>
        generate
      </div>
    </div>
  )
}
