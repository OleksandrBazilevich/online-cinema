import { ICollection } from '@/components/screens/collections/collections.types'

export interface IBestGenre extends Omit<ICollection, '_id' | 'image'> {}
