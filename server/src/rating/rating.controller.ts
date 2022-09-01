import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { User } from 'src/user/decorators/user.decorator'
import { SetRatingDto } from './dto/set-rating.dto'
import { RatingService } from './rating.service'

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get(':movieId')
  @Auth('user')
  async getMovieValueByUser(
    @Param('movieId', IdValidationPipe) movieId: Types.ObjectId,
    @User('_id') _id: Types.ObjectId,
  ) {
    return this.ratingService.getMovieValueByUser(movieId, _id)
  }

  @UsePipes(new ValidationPipe())
  @Put('set-rating')
  @HttpCode(200)
  @Auth('user')
  async setRating(@User('_id') _id: Types.ObjectId, @Body() dto: SetRatingDto) {
    return this.ratingService.setRating(_id, dto)
  }
}
