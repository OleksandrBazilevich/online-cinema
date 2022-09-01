import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { User } from 'src/user/decorators/user.decorator'
import { CommentService } from './comment.service'
import { CommentDto } from './dto/comment.dto'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Auth('user')
  async create(@User('_id') _id: string, @Body() dto: CommentDto) {
    return this.commentService.create(_id, dto)
  }

  @Put('/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Auth('user')
  async update(
    @Param('id', IdValidationPipe) _id: string,
    @User('_id') userId: string,
    @Body() dto: CommentDto,
  ) {
    return this.commentService.update(_id, userId, dto)
  }

  @Delete('/:id')
  @Auth('user')
  async delete(
    @Param('id', IdValidationPipe) _id: string,
    @User('_id') userId: string,
  ) {
    return this.commentService.delete(_id, userId)
  }

  @Get('/:movieId')
  async getByMovieId(
    @Param('movieId', IdValidationPipe) movieId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.commentService.getByMovieId(movieId, page, limit)
  }
}
