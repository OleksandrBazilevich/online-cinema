import { ICollection } from '@/components/screens/collections/collections.types'
import { IGenre } from '@/shared/types/movie.types'

export interface IBestGenre extends Omit<ICollection, '_id' | 'image'> {}
