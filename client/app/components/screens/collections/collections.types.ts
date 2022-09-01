import { TypeMaterialIconName } from '@/shared/types/icon.types'

export interface ICollection {
  _id: string
  image: string
  title: string
  slug: string
  icon?: TypeMaterialIconName
  moviesCount?: number
}
