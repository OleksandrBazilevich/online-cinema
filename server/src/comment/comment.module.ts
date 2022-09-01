import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { CommentModel } from './comment.model'
import { MovieModule } from 'src/movie/movie.module'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CommentModel,
        schemaOptions: {
          collection: 'Comment',
        },
      },
    ]),
    MovieModule,
    UserModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
