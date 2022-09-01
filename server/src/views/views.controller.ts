import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { ViewsService } from './views.service'

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('user')
  @Post('update/:movieId')
  async update(@Param('movieId', IdValidationPipe) movieId: Types.ObjectId) {
    return this.viewsService.update(movieId)
  }

  @Auth('admin')
  @Get('/:movieId')
  async getByMovieId(@Param('movieId', IdValidationPipe) movieId: string) {
    return this.viewsService.getViewsById(movieId)
  }

  @Auth('admin')
  @Get('/')
  async getAll() {
    return this.viewsService.getAll()
  }
}
