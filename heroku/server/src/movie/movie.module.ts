import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieController } from './movie.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { MovieModel } from './movie.model'
import { TelegramModule } from 'src/telegram/telegram.module'
import { ViewsService } from 'src/views/views.service'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MovieModel,
        schemaOptions: {
          collection: 'Movie',
        },
      },
    ]),
    TelegramModule,
  ],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
