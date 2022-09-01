import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { MainProvider } from 'providers/MainProvider'

import '@/assets/styles/globals.scss'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'

type TypeAppProps = AppProps & TypeComponentAuthFields

function MyApp({ Component, pageProps }: TypeAppProps) {
  const { asPath } = useRouter()
  return (
    <MainProvider pageProps={pageProps} Component={Component}>
      <Component {...pageProps} key={asPath} />
    </MainProvider>
  )
}

export default MyApp
