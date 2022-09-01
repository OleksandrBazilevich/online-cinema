export interface IGalleryItem {
  posterPath: string
  name: string
  link: string
  content?: {
    title: string
    subtitle?: string
  }
}

export interface IGalleryItemProps {
  isSlider?: boolean
  item: IGalleryItem
  variant: 'vertical' | 'horizontal'
}
