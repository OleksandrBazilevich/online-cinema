import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import { IProfileInput } from '../profile/profile.types'

import { Field } from '@/components/ui/form-elements/Field'
import { validEmail } from '@/shared/regex'

interface IAuthFields {
  register: UseFormRegister<any>
  formState: FormState<IProfileInput>
  isPasswordRequired?: boolean
}

export const AuthFields: FC<IAuthFields> = ({
  register,
  formState: { errors },
  isPasswordRequired,
}) => {
  return (
    <>
      <Field
        {...register('username', {
          required: 'username is required',
          minLength: {
            value: 3,
            message: 'min length is 3 chars',
          },
        })}
        placeholder="Username"
        error={errors.username}
      />
      <Field
        {...register('email', {
          required: 'email is required',
          pattern: {
            value: validEmail,
            message: 'please enter a valid email',
          },
        })}
        placeholder="E-mail"
        error={errors.email}
      />
      <Field
        {...register(
          'password',
          isPasswordRequired
            ? {
                required: 'password is required',
                minLength: {
                  value: 6,
                  message: 'min length is 6 chars',
                },
              }
            : {}
        )}
        placeholder="password"
        type="password"
        error={errors.password}
      />
    </>
  )
}
