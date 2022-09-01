import { axiosClassic } from 'api/interceptors'
import axios from 'api/interceptors'

import { IGenreEditInput } from '@/components/screens/admin/genres/genre-edit/genre-edit.interface'
import { IBestGenre } from '@/components/screens/admin/home/statistics/statistics.types'
import { ICollection } from '@/components/screens/collections/collections.types'
import { getGenresUrl } from '@/config/api.config'
import { IGenre } from '@/shared/types/movie.types'

export const GenreService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
      params: searchTerm ? { searchTerm } : {},
    })
  },

  async getBySlug(slug: string) {
    return axiosClassic.get<IGenre>(getGenresUrl(`get-by-slug/${slug}`))
  },

  async getCollections() {
    return axiosClassic.get<ICollection[]>(getGenresUrl(`collections`))
  },

  async getBest() {
    return axios.get<IBestGenre>(getGenresUrl(`best`))
  },

  async getById(_id: string) {
    return axios.get<IGenreEditInput>(getGenresUrl(`${_id}`))
  },

  async create() {
    return axios.post<string>(getGenresUrl(``))
  },

  async update(_id: string, data: IGenreEditInput) {
    return axios.put<string>(getGenresUrl(`${_id}`), data)
  },

  async delete(_id: string) {
    return axios.delete<string>(getGenresUrl(`${_id}`))
  },
}
