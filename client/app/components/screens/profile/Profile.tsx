import cn from 'classnames'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { AuthFields } from '../auth/AuthFields'

import styles from './Profile.module.scss'
import { IProfileInput } from './profile.types'
import { useProfile } from './useProfile'
import { Button } from '@/components/ui/form-elements/Button'
import { UploadField } from '@/components/ui/form-elements/upload-field/UploadField'
import { Heading } from '@/components/ui/heading/Heading'
import { widths } from '@/config/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Meta } from '@/utils/meta/Meta'

export const Profile: FC = () => {
  const { register, handleSubmit, formState, setValue, control } =
    useForm<IProfileInput>({
      mode: 'onChange',
    })

  const { isLoading, onSubmit } = useProfile(setValue)
  const matches = useMediaQuery(`(max-width: ${widths.mobileL}px)`)

  return (
    <Meta title="Profile">
      <Heading
        title="Profile"
        className={cn('mb-6', {
          'text-center': matches,
        })}
      />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <AuthFields formState={formState} register={register} />
        <Controller
          name="avatar"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <UploadField
                onChange={onChange}
                value={value}
                error={error}
                placeholder="avatar"
                folder="avatars"
              />
            )
          }}
        />
        <div className={styles.btn_container}>
          <Button>Update</Button>
        </div>
      </form>
    </Meta>
  )
}
