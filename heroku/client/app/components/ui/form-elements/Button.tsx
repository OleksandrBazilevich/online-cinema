import cn from 'classnames'
import { FC } from 'react'

import styles from './Form.module.scss'
import { IButton } from './form.types'

export const Button: FC<IButton> = ({ children, className, ...rest }) => {
  return (
    <button {...rest} className={cn(styles.button, className)}>
      {children}
    </button>
  )
}
