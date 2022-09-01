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
import { CreateGenreDto } from './dto/createGenre.dto'
import { GenreService } from './genre.service'

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get('get-by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.genreService.getBySlug(slug)
  }

  @Get('collections')
  async getCollections() {
    return this.genreService.getCollections()
  }

  @Get('best')
  @Auth('admin')
  async getBest() {
    return this.genreService.getBestGenre()
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.genreService.getAll(searchTerm)
  }

  @Get(':id')
  @Auth('admin')
  async getById(@Param('id', IdValidationPipe) _id: string) {
    return this.genreService.getById(_id)
  }

  @UsePipes(new ValidationPipe())
  @Post('')
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.genreService.create()
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(
    @Param('id', IdValidationPipe) _id: string,
    @Body() dto: CreateGenreDto,
  ) {
    return this.genreService.update(_id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id', IdValidationPipe) _id: string) {
    return this.genreService.delete(_id)
  }
}
