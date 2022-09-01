import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { CreateMovieDto } from './dto/create-movie.dto'
import { MovieService } from './movie.service'

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get('get-by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.movieService.getBySlug(slug)
  }

  @Get('get-by-actor/:actorId')
  async getByActor(
    @Param('actorId', IdValidationPipe) actorId: Types.ObjectId,
  ) {
    return this.movieService.getByActor(actorId)
  }

  // create Dto
  @UsePipes(new ValidationPipe())
  @Post('get-by-genres')
  @HttpCode(200)
  async getByGenres(@Body('genresIds') genresId: Types.ObjectId[]) {
    return this.movieService.getByGenres(genresId)
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.movieService.getAll(searchTerm)
  }

  @Get('most-popular')
  async getMostPopular() {
    return this.movieService.getMostPopular()
  }

  @Get('get-total-views')
  @Auth('admin')
  async getTotalViews() {
    return this.movieService.getAllViews()
  }

  @Get('get-best-movies')
  @Auth('admin')
  async getBestMovies() {
    return this.movieService.getBestMovies()
  }

  @Get(':id')
  @Auth('admin')
  async getById(@Param('id', IdValidationPipe) _id: string) {
    return this.movieService.getById(_id)
  }

  @UsePipes(new ValidationPipe())
  @Post('')
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.movieService.create()
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(
    @Param('id', IdValidationPipe) _id: string,
    @Body() dto: CreateMovieDto,
  ) {
    return this.movieService.update(_id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id', IdValidationPipe) _id: string) {
    return this.movieService.delete(_id)
  }
}
