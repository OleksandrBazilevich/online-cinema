import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { ActorModel } from './actor.model'
import { ActorDto } from './dto/actor.dto'

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(ActorModel) private readonly ActorModel: ModelType<ActorModel>,
  ) {}

  async getById(_id: string) {
    const actor = await this.ActorModel.findById(_id)
    if (!actor) throw new NotFoundException('actor not found')

    return actor
  }

  async update(_id: string, dto: ActorDto) {
    const updateActor = await this.ActorModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec()

    if (!updateActor) throw new NotFoundException('actor not found')

    return updateActor
  }

  async create() {
    const defaultValue: ActorDto = {
      name: '',
      slug: '',
      photo: '',
    }

    const actor = await this.ActorModel.create(defaultValue)

    return actor._id
  }

  async getBySlug(slug: string) {
    const actor = await this.ActorModel.findOne({ slug }).exec()

    if (!actor) throw new NotFoundException('actor not found')

    return actor
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
        ],
      }
    }
    return this.ActorModel.aggregate()
      .match(options)
      .lookup({
        from: 'Movie',
        foreignField: 'actors',
        localField: '_id',
        as: 'movies',
      })
      .addFields({
        countMovies: {
          $size: '$movies',
        },
      })
      .project({ __v: 0, updatedAt: 0, movies: 0 })
      .sort({
        createdAt: -1,
      })
      .exec()
  }

  async getBestActor() {
    return (await this.getAll()).sort((a, b) =>
      a.countMovies > b.countMovies ? -1 : 1,
    )[0]
  }

  async delete(_id: string) {
    const deleteActor = await this.ActorModel.findByIdAndDelete(_id).exec()

    if (!deleteActor) throw new NotFoundException('actor not found')

    return deleteActor
  }
}
