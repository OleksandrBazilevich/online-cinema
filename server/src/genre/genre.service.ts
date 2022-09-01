import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { deleteModel } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { MovieService } from 'src/movie/movie.service'
import { CreateGenreDto } from './dto/createGenre.dto'
import { ICollection } from './genre.interface'
import { GenreModel } from './genre.model'

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>,
    private readonly movieService: MovieService,
  ) {}

  async getById(_id: string) {
    const genre = await this.GenreModel.findById(_id)
    if (!genre) throw new NotFoundException('genre not found')

    return genre
  }

  async update(_id: string, dto: CreateGenreDto) {
    const updateGenre = await this.GenreModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec()

    if (!updateGenre) throw new NotFoundException('genre not found')

    return updateGenre
  }

  async create() {
    const defaultValue: CreateGenreDto = {
      name: '',
      description: '',
      slug: '',
      icon: '',
    }

    const genre = await this.GenreModel.create(defaultValue)

    return genre._id
  }

  async getCollections() {
    const genres = await this.getAll()
    const collection = await Promise.all(
      genres.map(async (genre) => {
        const moviesByGenre = await this.movieService.getByGenres([genre._id])
        const result: ICollection = {
          _id: String(genre._id),
          image: moviesByGenre[0] ? moviesByGenre[0].bigPoster : '',
          icon: genre.icon,
          slug: genre.slug,
          title: genre.name,
          moviesCount: moviesByGenre.length,
        }

        return result
      }),
    )

    return collection
  }

  async getBestGenre() {
    const genres = await this.getCollections()
    return genres
      .map((item) => ({
        title: item.title,
        moviesCount: item.moviesCount,
        slug: item.slug,
        icon: item.icon,
      }))
      .sort((a, b) => (a.moviesCount > b.moviesCount ? -1 : 1))[0]
  }

  async getBySlug(slug: string) {
    const genre = await this.GenreModel.findOne({ slug }).exec()

    if (!genre) throw new NotFoundException('genre not found')

    return genre
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) {
      options = {
        $or: [
          {
            name: new RegExp(searchTerm, 'i'),
          },
          {
            slug: new RegExp(searchTerm, 'i'),
          },
          {
            description: new RegExp(searchTerm, 'i'),
          },
        ],
      }
    }
    return this.GenreModel.find(options)
      .select('-updatedAt -__v')
      .sort({
        createdAt: 'desc',
      })
      .exec()
  }

  async delete(_id: string) {
    const deleteGenre = await this.GenreModel.findByIdAndDelete(_id).exec()

    if (!deleteGenre) throw new NotFoundException('genre not found')

    return deleteGenre
  }
}
