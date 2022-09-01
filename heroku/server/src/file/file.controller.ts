import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post()
  @HttpCode(200)
  @Auth('user')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    return this.fileService.saveFile([file], folder)
  }
}
