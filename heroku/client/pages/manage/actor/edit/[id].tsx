import { ActorEdit } from '@/components/screens/admin/actors/actor-edit/ActorEdit'
import { NextPageAuth } from '@/shared/types/auth.types'

const ActorEditPage: NextPageAuth = () => {
  return <ActorEdit />
}

ActorEditPage.isOnlyAdmin = true

export default ActorEditPage
