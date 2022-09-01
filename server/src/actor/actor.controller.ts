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
import { CreateGenreDto } from 'src/genre/dto/createGenre.dto'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { ActorService } from './actor.service'
import { ActorDto } from './dto/actor.dto'

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}
  @Get('get-by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.actorService.getBySlug(slug)
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.actorService.getAll(searchTerm)
  }

  @Get('best')
  async getBestActor() {
    return this.actorService.getBestActor()
  }

  @Get(':id')
  @Auth('admin')
  async getById(@Param('id', IdValidationPipe) _id: string) {
    return this.actorService.getById(_id)
  }

  @UsePipes(new ValidationPipe())
  @Post('')
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.actorService.create()
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(
    @Param('id', IdValidationPipe) _id: string,
    @Body() dto: ActorDto,
  ) {
    return this.actorService.update(_id, dto)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id', IdValidationPipe) _id: string) {
    return this.actorService.delete(_id)
  }
}
