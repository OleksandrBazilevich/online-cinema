import axios, { axiosClassic } from 'api/interceptors'

import { ICommentData } from '@/components/screens/movie/comments/comments.interface'
import { getCommentUrl } from '@/config/api.config'
import { IComment } from '@/shared/types/movie.types'

export interface ICommentByMovieIdRes {
  nextId: number | null
  data: IComment[]
}

export const CommentService = {
  async delete(_id: string) {
    return axios.delete<IComment>(getCommentUrl(`${_id}`))
  },

  async update(_id: string, data: { body: string }) {
    return axios.put<IComment>(getCommentUrl(`${_id}`), data)
  },

  async create(data: ICommentData) {
    return axios.post<IComment>(getCommentUrl(``), data)
  },

  async getByMovieId(movieId: string, page: number = 1, limit: number = 5) {
    return await axiosClassic.get<ICommentByMovieIdRes>(
      getCommentUrl(`${movieId}`),
      {
        params: { page, limit },
      }
    )
  },
}
