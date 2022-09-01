import { useRouter } from 'next/router'
import { FC } from 'react'

import styles from './AdminActions.module.scss'
import { MaterialIcon } from '@/components/ui/MaterialIcon'

interface IAdminActions {
  editUrl: string
  removeHandler: () => void
}

export const AdminActions: FC<IAdminActions> = ({ editUrl, removeHandler }) => {
  const { push } = useRouter()

  return (
    <div className={styles.action}>
      <button onClick={() => push(editUrl)}>
        <MaterialIcon name="MdEdit" />
      </button>
      <button onClick={removeHandler}>
        <MaterialIcon name="MdClose" />
      </button>
    </div>
  )
}
