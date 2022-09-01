import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import { IGenreEditInput } from './genre-edit.interface'
import { useGenreEdit } from './useGenreEdit'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { AdminNavigation } from '@/components/ui/admin-navigation/AdminNavigation'
import { Button } from '@/components/ui/form-elements/Button'
import { Field } from '@/components/ui/form-elements/Field'
import { SlugField } from '@/components/ui/form-elements/slug-field/SlugField'
import { Heading } from '@/components/ui/heading/Heading'
import { widths } from '@/config/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import formStyles from '@/ui/form-elements/AdminForm.module.scss'
import { Meta } from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

const DynamicTextEditor = dynamic(
  () =>
    import('@/components/ui/form-elements/TextEditor').then(
      (mod) => mod.TextEditor
    ),
  {
    ssr: false,
  }
)

export const GenreEdit: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IGenreEditInput>({
    mode: 'onChange',
  })

  const { isLoading, onSubmit } = useGenreEdit(setValue)
  const matches = useMediaQuery(`(max-width: ${widths.laptop}px)`)

  return (
    <Meta title="Edit genre">
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
              <div style={matches ? { width: '100%' } : { width: '31%' }}>
                <SlugField
                  register={register}
                  error={errors.slug}
                  generate={() => {
                    setValue('slug', generateSlug(getValues('name')))
                  }}
                />
              </div>
              <Field
                {...register('icon', {
                  required: 'Icon is required',
                })}
                placeholder="Icon"
                error={errors.icon}
                style={matches ? { width: '100%' } : { width: '31%' }}
              />
            </div>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <DynamicTextEditor
                    onChange={onChange}
                    value={value}
                    error={error}
                    placeholder="description"
                  />
                )
              }}
              rules={{
                validate: {
                  required: (value) => {
                    return (
                      (value && stripHtml(value).result.length > 0) ||
                      'Description is required'
                    )
                  },
                },
              }}
            />
            <Button>Update</Button>
          </>
        )}
      </form>
    </Meta>
  )
}
