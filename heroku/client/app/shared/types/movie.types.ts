import { TypeMaterialIconName } from './icon.types'
import { IUser } from './user.types'

export interface IGenre {
  _id: string
  name: string
  slug: string
  description: string
  icon: TypeMaterialIconName
}

export interface IParameters {
  year: number
  duration: number
  country: string
}

export interface IActor {
  _id: string
  photo: string
  name: string
  countMovies: number
  slug: string
}

export interface IViews {
  month: number
  views: number
}

export interface IComment {
  _id: string
  body: string
  isSpoiler: boolean
  user: Pick<IUser, '_id' | 'avatar' | 'username'>
  createdAt: string
  updatedAt: string
  movieId?: string
}

export interface IMovie {
  _id: string
  poster: string
  bigPoster: string
  title: string
  parameters: IParameters
  genres: IGenre[]
  actors: IActor[]
  countViews: number
  videoUrl: string
  rating: number
  slug: string
}
