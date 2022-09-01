export const API_URL = `${process.env.APP_URL}/api`
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api`

export const getGenresUrl = (string: string) => `/genre/${string}`
export const getAuthUrl = (string: string) => `/auth/${string}`
export const getUsersUrl = (string: string) => `/user/${string}`
export const getMoviesUrl = (string: string) => `/movie/${string}`
export const getActorsUrl = (string: string) => `/actor/${string}`
export const getRatingsUrl = (string: string) => `/rating/${string}`
export const getViewsUrl = (string: string) => `/views/${string}`
export const getCommentUrl = (string: string) => `/comment/${string}`
