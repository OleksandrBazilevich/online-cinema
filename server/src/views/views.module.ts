import { Module } from '@nestjs/common'
import { ViewsService } from './views.service'
import { ViewsController } from './views.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { ViewsModel } from './views.model'
import { MovieModule } from 'src/movie/movie.module'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ViewsModel,
        schemaOptions: {
          collection: 'Views',
        },
      },
    ]),
    MovieModule,
  ],
  controllers: [ViewsController],
  providers: [ViewsService],
})
export class ViewsModule {}
