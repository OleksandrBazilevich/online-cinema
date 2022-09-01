import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ActorModel } from 'src/actor/actor.model'
import { CommentModel } from 'src/comment/comment.model'
import { GenreModel } from 'src/genre/genre.model'
import { ViewsModel } from 'src/views/views.model'

export interface MovieModel extends Base {}

export class Parameters {
  @prop()
  year: number

  @prop()
  duration: number

  @prop()
  country: string
}

export class Views {
  @prop()
  year: number

  @prop()
  month: string

  @prop()
  views: number
}

export class MovieModel extends TimeStamps {
  @prop()
  poster: string

  @prop()
  bigPoster: string

  @prop()
  title: string

  @prop()
  parameters?: Parameters

  @prop({ unique: true })
  slug: string

  @prop({ default: 1 })
  rating?: number

  @prop({ default: 0 })
  countViews?: number

  @prop()
  videoUrl: string

  @prop({ ref: () => GenreModel })
  genres: Ref<GenreModel>[]

  @prop({ ref: () => ActorModel })
  actors: Ref<ActorModel>[]

  @prop({ default: false })
  isSendTelegram?: boolean
}
