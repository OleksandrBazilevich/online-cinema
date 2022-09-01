import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { ViewsModel } from './views.model'
import * as dayjs from 'dayjs'
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import * as updateLocale from 'dayjs/plugin/updateLocale'
import * as localeData from 'dayjs/plugin/localeData'
import { Types } from 'mongoose'
import { MovieService } from 'src/movie/movie.service'
import { IViews } from './views.types'

dayjs.extend(isSameOrAfter)
dayjs.extend(updateLocale)
dayjs.extend(localeData)

dayjs.updateLocale('en', {
  monthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
})

@Injectable()
export class ViewsService {
  constructor(
    @InjectModel(ViewsModel) private readonly ViewsModel: ModelType<ViewsModel>,
    private readonly movieService: MovieService,
  ) {}

  async update(movieId: Types.ObjectId) {
    const view = await this.ViewsModel.findOneAndUpdate(
      {
        $and: [
          {
            movieId,
          },
          {
            month: dayjs(new Date()).format('M'),
          },
          {
            year: dayjs(new Date()).format('YYYY'),
          },
        ],
      },
      { $inc: { views: 1 } },
    ).exec()

    if (!view) {
      await this.ViewsModel.create({ movieId, views: 1 })
      await this.movieService.updateViewsCount(movieId)
      return
    }

    await this.movieService.updateViewsCount(movieId)
    return
  }

  async getViewsById(movieId: string) {
    const views = await this.ViewsModel.aggregate().match({
      movieId: new Types.ObjectId(movieId),
    })

    return views.map((item) => ({ month: item.month, views: item.views }))
  }

  async getAll() {
    const views: IViews[] = await this.ViewsModel.aggregate()
      .match({
        year: Number(dayjs(new Date()).format('YYYY')),
      })
      .group({ _id: '$month', totalViews: { $sum: '$views' } })
      .project({ month: '$_id', views: '$totalViews', _id: false })
    return views.sort((a, b) => (a.month > b.month ? 1 : -1))
  }
}
