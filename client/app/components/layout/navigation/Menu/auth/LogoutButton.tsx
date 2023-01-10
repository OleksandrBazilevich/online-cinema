import { FC, MouseEvent } from 'react'

import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { useActions } from '@/hooks/useActions'

export const LogoutButton: FC = () => {
  const { logout } = useActions()

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    logout()
  }

  return (
    <li>
      <button onClick={handleLogout}>
        <MaterialIcon name="MdLogout" />
        <span>Logout</span>
      </button>
    </li>
  )
}
