import { widths } from '@/config/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { FC } from 'react'
import ReduxToastr from 'react-redux-toastr'

export const ReduxToast: FC = () => {
  const matches = useMediaQuery(`(min-width: ${widths.tablet}px)`)
  return (
    <ReduxToastr
      newestOnTop={false}
      preventDuplicates
      progressBar
      closeOnToastrClick
      timeOut={matches ? 500 : 4000}
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
  )
}
