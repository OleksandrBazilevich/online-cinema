import { Favorites } from '@/components/screens/favorites/Favorites'
import { NextPageAuth } from '@/shared/types/auth.types'

const FavoritesPage: NextPageAuth = () => {
  return <Favorites />
}

FavoritesPage.isOnlyUser = true

export default FavoritesPage
