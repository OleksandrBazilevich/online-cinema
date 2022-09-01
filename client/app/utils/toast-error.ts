import { errorCatch } from 'api/api.helper'
import { toastr } from 'react-redux-toastr'

export const toastError = (error: any, title?: string) => {
  const message = errorCatch(error)
  toastr.error(title || 'error request', message)

  throw message
}
