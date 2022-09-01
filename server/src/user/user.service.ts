import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { genSalt, hash } from 'bcryptjs'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UserModel } from './user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}

  async getById(_id: string) {
    const user = await this.UserModel.findById(_id)
    if (!user) throw new NotFoundException('user not found')

    return user
  }

  async updateProfile(_id: string, dto: UpdateUserDto) {
    const user = await this.getById(_id)
    const isSameUserByEmail = await this.UserModel.findOne({ email: dto.email })
    const isSameUserByUserName = await this.UserModel.findOne({
      username: dto.username,
    })

    if (isSameUserByEmail && String(_id) != String(isSameUserByEmail._id))
      throw new NotFoundException('email is busy')

    if (isSameUserByUserName && String(_id) != String(isSameUserByUserName._id))
      throw new NotFoundException('username is busy')

    if (dto.password) {
      const salt = await genSalt(10)
      user.password = await hash(dto.password, salt)
    }

    user.email = dto.email
    user.avatar = dto.avatar

    if (dto.isAdmin || dto.isAdmin === false) user.isAdmin = dto.isAdmin

    await user.save()

    return
  }

  async getCount() {
    return this.UserModel.find().count().exec()
  }

  async getAll(searchTerm?: string) {
    let options = {}

    if (searchTerm) {
      options = {
        $or: [
          {
            email: new RegExp(searchTerm, 'i'),
          },
        ],
      }
    }
    return this.UserModel.find(options)
      .select('-password -updatedAt -__v')
      .sort({
        createdAt: 'desc',
      })
      .exec()
  }

  async delete(_id: string) {
    return this.UserModel.findByIdAndDelete(_id).exec()
  }

  async toggleFavorite(movieId: Types.ObjectId, user: UserModel) {
    const { _id, favorites } = user

    await this.UserModel.findOneAndUpdate(_id, {
      favorites: favorites.includes(movieId)
        ? favorites.filter((id) => String(id) != String(movieId))
        : [...favorites, movieId],
    })
  }

  async getFavoritesMovie(_id: Types.ObjectId) {
    return this.UserModel.findById(_id, 'favorites')
      .populate({ path: 'favorites', populate: { path: 'genres' } })
      .exec()
      .then((data) => data.favorites)
  }
}
