import cn from 'classnames'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useUserEdit } from './useUserEdit'
import { IUserEditInput } from './user-edit.types'
import { AuthFields } from '@/components/screens/auth/AuthFields'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { AdminNavigation } from '@/components/ui/admin-navigation/AdminNavigation'
import { Button } from '@/components/ui/form-elements/Button'
import { Heading } from '@/components/ui/heading/Heading'
import { widths } from '@/config/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Meta } from '@/utils/meta/Meta'

export const UserEdit: FC = () => {
  const { handleSubmit, register, formState, setValue, control } =
    useForm<IUserEditInput>({
      mode: 'onChange',
    })

  const { isLoading, onSubmit } = useUserEdit(setValue)
  const matches = useMediaQuery(`(max-width: ${widths.mobileL}px)`)

  return (
    <Meta title="Edit user">
      <AdminNavigation />
      <Heading title="Edit user" className={cn({ 'text-center': matches })} />
      <form onSubmit={handleSubmit(onSubmit)} className="admin-from">
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            <AuthFields
              register={register}
              isPasswordRequired
              formState={formState}
            />
            <Controller
              control={control}
              name="isAdmin"
              render={({ field }) => (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    field.onChange(!field.value)
                  }}
                  className={cn('text-link block mb-7', {
                    'w-22 mx-auto': matches,
                  })}
                >
                  {field.value ? 'Make it regular user' : 'make it admin'}
                </button>
              )}
            ></Controller>
            <Button>Update</Button>
          </>
        )}
      </form>
    </Meta>
  )
}
