import cn from 'classnames'
import { forwardRef } from 'react'

import styles from './Form.module.scss'
import { ITextArea } from './form.types'

export const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
  ({ placeholder, error, style, ...rest }, ref) => {
    return (
      <div className={cn(styles.common, styles.field)} style={style}>
        <label>
          <span>{placeholder || ''}</span>
          <textarea autoCorrect="off" spellCheck={false} ref={ref} {...rest} />
        </label>
        {error && <div className={styles.error}>{error.message}</div>}
      </div>
    )
  }
)
