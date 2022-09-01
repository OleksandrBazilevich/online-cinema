export const accentColor = '#e30b13'
export const bgColor = '#191b1f'

export const IS_SERVER = typeof window === 'undefined'
export const IS_CLIENT = typeof window !== 'undefined'
export const IS_PRODUCTION = process.env.APP_ENV === 'production'

export const widths = {
  laptopL: 1440,
  laptop: 1024,
  tablet: 768,
  mobileL: 426,
  mobileM: 375,
  mobileS: 329,
}
