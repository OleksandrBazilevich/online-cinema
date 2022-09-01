import { UserEdit } from '@/components/screens/admin/users/user-edit/UserEdit'
import { NextPageAuth } from '@/shared/types/auth.types'

const UserEditPage: NextPageAuth = () => {
  return <UserEdit />
}

UserEditPage.isOnlyAdmin = true

export default UserEditPage
