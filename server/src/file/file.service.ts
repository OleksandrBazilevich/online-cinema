import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { v4 as uuidv4 } from 'uuid'

import { FilesResponse } from './file.interface'

@Injectable()
export class FileService {
  async saveFile(
    files: Express.Multer.File[],
    folder: string = 'default',
  ): Promise<FilesResponse[]> {
    const uploadFolder = `${path}/uploads/${folder}`
    await ensureDir(uploadFolder)

    const res: FilesResponse[] = await Promise.all(
      files.map(async (file) => {
        const id: string = uuidv4()
        await writeFile(
          `${uploadFolder}/${id}-${file.originalname}`,
          file.buffer,
        )

        return {
          url: `/uploads/${folder}/${id}-${file.originalname}`,
          name: `${id}-${file.originalname}`,
        }
      }),
    )

    return res
  }
}
