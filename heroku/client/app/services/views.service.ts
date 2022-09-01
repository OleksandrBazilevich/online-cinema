import axios from 'api/interceptors'

import { getViewsUrl } from '@/config/api.config'

export const ViewsService = {
  async updateViews(movieId: string) {
    return axios.post(getViewsUrl(`update/${movieId}`))
  },
}
