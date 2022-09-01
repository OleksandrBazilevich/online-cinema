import Image from 'next/image'
import { FC } from 'react'

import { ICollection } from './collections.types'

export const CollectionImg: FC<{ collection: ICollection }> = ({
  collection: { title, image },
}) => {
  return <Image alt={title} src={image} layout="fill" draggable={false} />
}
