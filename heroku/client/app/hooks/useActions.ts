import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { rootAction } from '@/store/rootAction'

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch])
}
