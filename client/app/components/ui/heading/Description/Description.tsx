import cn from 'classnames'
import { FC } from 'react'
import parse from 'react-html-parser'

import styles from './Description.module.scss'

interface IDescription {
  text: string
  className?: string
}

export const Description: FC<IDescription> = ({ text, className = '' }) => {
  return <div className={cn(styles.description, className)}>{parse(text)}</div>
}
