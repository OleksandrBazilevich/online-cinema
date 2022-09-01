import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { IMovieEditInput } from './movie-edit.types'
import { useAdminActor } from './useAdminActor'
import { useAdminGenre } from './useAdminGenre'
import { useMovieEdit } from './useMovieEdit'
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

export const MovieEdit: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IMovieEditInput>({
    mode: 'onChange',
  })

  const DynamicSelect = dynamic(
    () => import('@/ui/select/Select').then((mod) => mod.Select),
    {
      ssr: false,
    }
  )

  const { isLoading, onSubmit } = useMovieEdit(setValue)
  const { isLoading: isLoadingGenre, data: GenreData } = useAdminGenre()
  const { isLoading: isLoadingActor, data: ActorData } = useAdminActor()
  const matches = useMediaQuery(`(max-width: ${widths.laptop}px)`)

  return (
    <Meta title="Edit movie">
      <AdminNavigation />
      <Heading title="Edit Movie" />
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            <div className={formStyles.fields}>
              <Field
                {...register('title', {
                  required: 'Name is required',
                })}
                placeholder="Name"
                error={errors.title}
                style={matches ? { width: '100%' } : { width: '31%' }}
              />
              <SlugField
                register={register}
                error={errors.slug}
                generate={() => {
                  setValue('slug', generateSlug(getValues('title')))
                }}
                Style={matches ? { width: '100%' } : {}}
              />
              <Field
                {...register('parameters.country', {
                  required: 'Country is required',
                })}
                placeholder="Country"
                error={errors.parameters?.country}
                style={matches ? { width: '100%' } : { width: '31%' }}
              />
              <Field
                {...register('parameters.duration', {
                  required: 'Duration is required',
                })}
                placeholder="Duration (min)"
                error={errors.parameters?.duration}
                style={matches ? { width: '100%' } : { width: '31%' }}
              />
              <Field
                {...register('parameters.year', {
                  required: 'Year is required',
                })}
                placeholder="Year"
                error={errors.parameters?.year}
                style={matches ? { width: '100%' } : { width: '31%' }}
              />
              <Controller
                name="genres"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <DynamicSelect
                      field={field}
                      options={GenreData || []}
                      isLoading={isLoadingGenre}
                      isMulti
                      placeholder="Genres"
                      error={error}
                    />
                  )
                }}
                rules={{
                  required: 'Please select at least one genre',
                }}
              />
              <Controller
                name="actors"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <DynamicSelect
                      field={field}
                      options={ActorData || []}
                      isLoading={isLoadingActor}
                      isMulti
                      placeholder="Actors"
                      error={error}
                    />
                  )
                }}
                rules={{
                  required: 'Please select at least one actor',
                }}
              />

              <Controller
                name="poster"
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
                      placeholder="Poster"
                      folder="movies"
                    />
                  )
                }}
                rules={{
                  required: 'Poster is required',
                }}
              />
              <Controller
                name="bigPoster"
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
                      placeholder="Big Poster"
                      folder="movies"
                    />
                  )
                }}
                rules={{
                  required: 'Big Poster is required',
                }}
              />
              <Controller
                name="videoUrl"
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
                      placeholder="Video"
                      style={{ marginTop: -25 }}
                      folder="movies"
                      isNoImage
                    />
                  )
                }}
                rules={{
                  required: 'Video is required',
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
