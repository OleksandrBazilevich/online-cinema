import { prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { MovieModel } from 'src/movie/movie.model'
import * as dayjs from 'dayjs'

export class ViewsModel {
  @prop({ default: dayjs(new Date()).format('M') })
  month: number

  @prop({ default: dayjs(new Date()).format('YYYY') })
  year: number

  @prop({ ref: () => MovieModel })
  movieId: Ref<MovieModel>

  @prop({ default: 0 })
  views: number
}
