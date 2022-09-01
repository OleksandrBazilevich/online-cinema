import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { MovieService } from 'src/movie/movie.service'
import { UserService } from 'src/user/user.service'
import { CommentModel } from './comment.model'
import { CommentDto } from './dto/comment.dto'

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentModel)
    private readonly CommentModel: ModelType<CommentModel>,
    private readonly MovieService: MovieService,
    private readonly UserService: UserService,
  ) {}

  async create(userId: string, dto: CommentDto) {
    const comment = await this.CommentModel.create({ ...dto, user: userId })

    return comment
  }

  async update(_id: string, userId: string, dto: CommentDto) {
    const comment = await this.CommentModel.findById(_id)

    if (!comment) return new NotFoundException('comment not found')

    const user = await this.UserService.getById(userId)

    if (comment.user._id != user._id && !user.isAdmin)
      return new BadRequestException('you cant edit this comment')

    return this.CommentModel.findByIdAndUpdate(_id, dto)
  }

  async delete(_id: string, userId: string) {
    const comment = await this.CommentModel.findById(_id)

    if (!comment) return new NotFoundException('comment not found')

    const user = await this.UserService.getById(userId)

    if (comment.user._id != user._id && !user.isAdmin)
      return new BadRequestException('you cant delete this comment')

    return await this.CommentModel.findByIdAndDelete(_id)
  }

  async getByMovieId(movieId: string, page: number, limit: number) {
    const comments = await this.CommentModel.find({ movieId })
      .populate('user', ['username', 'avatar'])
      .sort({ createdAt: 'desc' })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec()

    if (!comments) return new NotFoundException('comment not found')

    if (!comments[comments.length - 1]) return { next: null, data: [] }
    const nextId = Number(page) + 1

    return {
      nextId,
      data: comments,
    }
  }
}
