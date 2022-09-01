import axios, { axiosClassic } from 'api/interceptors'

import { getRatingsUrl } from '@/config/api.config'

export const RatingService = {
  async setRating(movieId: string, value: number) {
    return axios.put<string>(getRatingsUrl(`set-rating`), {
      movieId,
      value,
    })
  },

  async getMovieRating(movieId: string) {
    return axios.get<number>(getRatingsUrl(`${movieId}`))
  },
}
