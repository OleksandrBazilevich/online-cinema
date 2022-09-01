import axios from 'api/interceptors'

interface IFileResponseItem {
  url: string
  name: string
}

export const FileService = {
  async upload(file: FormData, folder?: string) {
    return axios.post<IFileResponseItem[]>('file', file, {
      params: { folder },
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
