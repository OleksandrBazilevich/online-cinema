import { FC } from 'react'

import { Button } from '../../form-elements/Button'

export const AdminCreateButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return <Button onClick={onClick}>Create new</Button>
}
