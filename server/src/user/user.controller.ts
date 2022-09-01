import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { User } from './decorators/user.decorator'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UserModel } from './user.model'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@User('_id') _id: string) {
    return this.userService.getById(_id)
  }

  @UsePipes(new ValidationPipe())
  @Put('profile')
  @HttpCode(200)
  @Auth()
  async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(_id, dto)
  }

  @Get('profile/favorites')
  @Auth()
  async getFavorites(@User('_id') _id: Types.ObjectId) {
    return this.userService.getFavoritesMovie(_id)
  }

  @Put('profile/favorites')
  @HttpCode(200)
  @Auth()
  async toggleFavorite(
    @Body('movieId', IdValidationPipe) movieId: Types.ObjectId,
    @User() user: UserModel,
  ) {
    return this.userService.toggleFavorite(movieId, user)
  }

  @Get('count')
  @Auth('admin')
  async getCountUsers() {
    return this.userService.getCount()
  }

  @Get()
  @Auth('admin')
  async getUsers(@Query('searchTerm') searchTerm?: string) {
    return this.userService.getAll(searchTerm)
  }

  @Get(':id')
  @Auth('admin')
  async getUser(@Param('id', IdValidationPipe) _id: string) {
    return this.userService.getById(_id)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async updateProfileByAdmin(
    @Param('id', IdValidationPipe) _id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateProfile(_id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id', IdValidationPipe) _id: string) {
    return this.userService.delete(_id)
  }
}
