import axios from 'api/interceptors'

import { getMoviesUrl, getUsersUrl, getViewsUrl } from '@/config/api.config'
import { IViews } from '@/shared/types/movie.types'

export const AdminService = {
  async getCountUsers() {
    return axios.get<number>(getUsersUrl('count'))
  },

  async getTotalViews() {
    return axios.get<number>(getMoviesUrl(`get-total-views`))
  },

  async getAllViewsByMonth() {
    return axios.get<IViews[]>(getViewsUrl(``))
  },
}
