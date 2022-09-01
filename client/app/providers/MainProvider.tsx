import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react'
import { Provider } from 'react-redux'

import { ReduxToast } from './ReduxToast'
import { AuthProvider } from './auth-provider/AuthProvider'
import { HeadProvider } from './head-provider/HeadProvider'
import { Layout } from '@/components/layout/Layout'
import { store } from '@/store/store'

export const MainProvider = ({ children, Component, pageProps }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  return (
    <HeadProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydrateState}>
            <AuthProvider Component={Component}>
              <ReduxToast />
              <Layout>{children}</Layout>
            </AuthProvider>
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </HeadProvider>
  )
}
