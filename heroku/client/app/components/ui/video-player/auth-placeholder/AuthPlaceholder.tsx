import { FC } from 'react'

import { AuthButton } from './AuthButton'
import styles from './AuthPlaceholder.module.scss'

export const AuthPlaceholder: FC<{ slug: string }> = ({ slug }) => {
  return (
    <div className={styles.placeholder}>
      <div>
        <div>you must be logged in to start watching</div>
        <AuthButton slug={slug} />
      </div>
    </div>
  )
}
