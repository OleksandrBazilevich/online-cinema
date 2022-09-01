import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { IActorEditInput } from './actor-edit.types'
import { useActorEdit } from './useActorEdit'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { AdminNavigation } from '@/components/ui/admin-navigation/AdminNavigation'
import { Button } from '@/components/ui/form-elements/Button'
import { Field } from '@/components/ui/form-elements/Field'
import { SlugField } from '@/components/ui/form-elements/slug-field/SlugField'
import { UploadField } from '@/components/ui/form-elements/upload-field/UploadField'
import { Heading } from '@/components/ui/heading/Heading'
import { widths } from '@/config/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import formStyles from '@/ui/form-elements/AdminForm.module.scss'
import { Meta } from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

export const ActorEdit: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IActorEditInput>({
    mode: 'onChange',
  })

  const { isLoading, onSubmit } = useActorEdit(setValue)
  const matches = useMediaQuery(`(max-width: ${widths.laptop}px)`)

  return (
    <Meta title="Edit actor">
      <AdminNavigation />
      <Heading title="Edit genre" />
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            <div className={formStyles.fields}>
              <Field
                {...register('name', {
                  required: 'Name is required',
                })}
                placeholder="Name"
                error={errors.name}
                style={matches ? { width: '100%' } : { width: '31%' }}
              />
              <SlugField
                Style={matches ? { width: '100%' } : { width: '31%' }}
                register={register}
                error={errors.slug}
                generate={() => {
                  setValue('slug', generateSlug(getValues('name')))
                }}
              />
              <Controller
                name="photo"
                control={control}
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <UploadField
                      onChange={onChange}
                      value={value}
                      error={error}
                      placeholder="photo"
                      folder="actors"
                    />
                  )
                }}
                rules={{
                  required: 'Photo is required',
                }}
              />
            </div>
            <Button>Update</Button>
          </>
        )}
      </form>
    </Meta>
  )
}
