import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { MovieModel } from 'src/movie/movie.model'
import { UserModel } from 'src/user/user.model'

export interface CommentModel extends Base {}

export class CommentModel extends TimeStamps {
  @prop()
  body: string

  @prop({ default: false })
  isSpoiler: boolean

  @prop({ ref: () => UserModel })
  user: Ref<UserModel>

  @prop({ ref: () => MovieModel })
  movieId: Ref<MovieModel>
}
