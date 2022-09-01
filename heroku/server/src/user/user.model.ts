import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { MovieModel } from 'src/movie/movie.model'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @prop({ unique: true })
  email: string

  @prop()
  password: string

  @prop({ unique: true })
  username: string

  @prop({ default: '/uploads/avatars/default_avatar.png' })
  avatar: string

  @prop({ default: false })
  isAdmin?: boolean

  @prop({ default: [], ref: () => MovieModel })
  favorites?: Ref<MovieModel>[]
}
