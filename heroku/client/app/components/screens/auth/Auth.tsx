import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import styles from './Auth.module.scss'
import { AuthFields } from './AuthFields'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'
import { Button } from '@/components/ui/form-elements/Button'
import { Heading } from '@/components/ui/heading/Heading'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { Meta } from '@/utils/meta/Meta'

export const Auth: FC = () => {
  useAuthRedirect()

  const { isLoading } = useAuth()

  const [type, setType] = useState<'login' | 'register'>('login')

  const {
    register: RegisterInput,
    handleSubmit,
    formState,
    reset,
  } = useForm<IAuthInput>({
    mode: 'onChange',
  })

  const { login, register } = useActions()

  const onSubmit: SubmitHandler<IAuthInput> = (data) => {
    if (type === 'login') login(data)
    else if (type === 'register') register(data)

    reset()
  }

  return (
    <Meta title="auth">
      <section className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading title="Auth" className="mb-6" />

          <AuthFields
            formState={formState}
            register={RegisterInput}
            isPasswordRequired
          />

          <div className={styles.buttons}>
            <Button
              type="submit"
              onClick={() => setType('login')}
              disabled={isLoading}
            >
              login
            </Button>
            <Button
              type="submit"
              onClick={() => setType('register')}
              disabled={isLoading}
            >
              register
            </Button>
          </div>
        </form>
      </section>
    </Meta>
  )
}
