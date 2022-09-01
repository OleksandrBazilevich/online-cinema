import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import dayjs from 'dayjs'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { TelegramService } from 'src/telegram/telegram.service'
import { ViewsService } from 'src/views/views.service'
import { CreateMovieDto } from './dto/create-movie.dto'
import { MovieModel, Views } from './movie.model'

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>,
    private readonly telegramService: TelegramService,
  ) {}

  async getById(_id: string) {
    const movie = await this.MovieModel.findById(_id)
    if (!movie) throw new NotFoundException('movie not found')

    return movie
  }

  async update(_id: string, dto: CreateMovieDto) {
    if (!dto.isSendTelegram) {
      await this.sendNotification(dto)
      dto.isSendTelegram = true
    }

    const updateMovie = await this.MovieModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec()

    if (!updateMovie) throw new NotFoundException('movie not found')

    return updateMovie
  }

  async create() {
    const defaultValue: CreateMovieDto = {
      bigPoster: '',
      actors: [],
      genres: [],
      poster: '',
      title: '',
      videoUrl: '',
      slug: '',
    }

    const movie = await this.MovieModel.create(defaultValue)

    return movie._id
  }

  async getBySlug(slug: string) {
    const movie = await this.MovieModel.findOne({ slug })
      .populate('actors genres')
      .exec()

    if (!movie) throw new NotFoundException('movie not found')

    return movie
  }

  async getByActor(actorId: Types.ObjectId) {
    const movies = await this.MovieModel.find({ actors: actorId }).exec()

    if (!movies) throw new NotFoundException('movies not found')

    return movies
  }

  async getByGenres(genreIds: Types.ObjectId[]) {
    const movies = await this.MovieModel.find({
      genres: { $in: genreIds },
    }).exec()

    if (!movies) throw new NotFoundException('movie not found')

    return movies
  }

  async updateViewsCount(id: Types.ObjectId) {
    const movie = await this.MovieModel.findByIdAndUpdate(id, {
      $inc: { countViews: 1 },
    })
    if (!movie) throw new NotFoundException('movie not found')

    return movie
  }

  async updateRating(id: Types.ObjectId, newRating: number) {
    return this.MovieModel.findByIdAndUpdate(
      id,
      {
        rating: newRating,
      },
      {
        new: true,
      },
    ).exec()
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) {
      options = {
        $or: [
          {
            title: new RegExp(searchTerm, 'i'),
          },
        ],
      }
    }
    return this.MovieModel.find(options)
      .select('-updatedAt -__v')
      .sort({
        createdAt: 'desc',
      })
      .populate('actors genres')
      .exec()
  }

  async getAllViews() {
    return (await this.MovieModel.find())
      .map((movie) => movie.countViews)
      .reduce((a, b) => a + b)
  }

  async getBestMovies() {
    return this.MovieModel.find({ rating: { $gt: 0 } })
      .sort({ rating: -1 })
      .exec()
  }

  async delete(_id: string) {
    const deleteMovie = await this.MovieModel.findByIdAndDelete(_id).exec()

    if (!deleteMovie) throw new NotFoundException('movie not found')

    return deleteMovie
  }

  async getMostPopular() {
    return await this.MovieModel.find({ countViews: { $gt: 0 } })
      .sort({ countViews: -1 })
      .populate('genres')
      .exec()
  }

  async sendNotification(dto: CreateMovieDto) {
    // if (process.env.NODE_ENV != 'development')
    // await this.telegramService.sendPhoto(dto.poster)

    await this.telegramService.sendPhoto(
      'https://fanart.tv/fanart/movies/245891/movieposter/john-wick-5cdaceaf4e0a7.jpg',
    )

    const message = `<b>${dto.title}</b>`

    await this.telegramService.sendMessage(message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              url: 'https://okko.tv/movie/free-guy',
              text: 'go to watch',
            },
          ],
        ],
      },
    })
  }
}
