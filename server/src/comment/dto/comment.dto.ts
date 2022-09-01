import { IsString } from 'class-validator'

export class CommentDto {
  isSpoiler?: boolean

  @IsString()
  body: string

  movieId?: string
}
