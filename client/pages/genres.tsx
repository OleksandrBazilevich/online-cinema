import { GetStaticProps, NextPage } from 'next'

import { Collections } from '@/components/screens/collections/Collections'
import { ICollection } from '@/components/screens/collections/collections.types'
import { GenreService } from '@/services/genre.service'

const GenresPage: NextPage<{ collections: ICollection[] }> = ({
  collections,
}) => {
  return <Collections collections={collections || []} />
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: collections } = await GenreService.getCollections()

    return {
      props: {
        collections,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      props: {
        collections: [],
      },
    }
  }
}

export default GenresPage
