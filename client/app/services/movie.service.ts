import { axiosClassic } from 'api/interceptors'
import axios from 'api/interceptors'

import { IMovieEditInput } from '@/components/screens/admin/movies/movie-edit/movie-edit.types'
import { getMoviesUrl } from '@/config/api.config'
import { IMovie } from '@/shared/types/movie.types'

export const MovieService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
      params: searchTerm ? { searchTerm } : {},
    })
  },

  async getMostPopular() {
    const { data: movies } = await axiosClassic.get<IMovie[]>(
      getMoviesUrl('most-popular')
    )
    return movies
  },

  async getById(_id: string) {
    return axios.get<IMovieEditInput>(getMoviesUrl(`${_id}`))
  },

  async getBySlug(slug: string) {
    return axiosClassic.get<IMovie>(getMoviesUrl(`get-by-slug/${slug}`))
  },

  async getByActor(actorId: string) {
    return axiosClassic.get<IMovie[]>(getMoviesUrl(`get-by-actor/${actorId}`))
  },

  async getByGenres(genresIds: string[]) {
    return axiosClassic.post<IMovie[]>(getMoviesUrl('get-by-genres/'), {
      genresIds,
    })
  },

  async getBestMovies() {
    return axios.get<IMovie[]>(getMoviesUrl(`get-best-movies`))
  },

  async create() {
    return axios.post<string>(getMoviesUrl(``))
  },

  async update(_id: string, data: IMovieEditInput) {
    return axios.put<string>(getMoviesUrl(`${_id}`), data)
  },

  async delete(_id: string) {
    return axios.delete<string>(getMoviesUrl(`${_id}`))
  },

  async updateCountOpened(slug: string) {
    return axiosClassic.patch<string>(getMoviesUrl('update-count-opened'), {
      slug,
    })
  },
}
