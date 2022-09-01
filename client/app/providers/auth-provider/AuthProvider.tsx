import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'

const DynamicCheckRole = dynamic(
  () => import('./CheckRole').then((mod) => mod.CheckRole),
  {
    ssr: false,
  }
)

export const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
  children,
  Component: { isOnlyAdmin, isOnlyUser },
}) => {
  const { user } = useAuth()
  const { logout, checkAuth } = useActions()
  const { pathname } = useRouter()

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) checkAuth()
  }, [])

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken')
    if (!refreshToken && user) logout()
  }, [pathname])
  return !isOnlyAdmin && !isOnlyUser ? (
    <>{children}</>
  ) : (
    <DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
      {children}
    </DynamicCheckRole>
  )
}
