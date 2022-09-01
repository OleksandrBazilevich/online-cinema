import { useQuery } from '@tanstack/react-query'

import { IOption } from '@/components/ui/select/select.types'
import { GenreService } from '@/services/genre.service'
import { toastError } from '@/utils/toast-error'

export const useAdminGenre = () => {
  const queryData = useQuery(['list of genres'], () => GenreService.getAll(), {
    select: ({ data }) =>
      data.map(
        (genre): IOption => ({
          label: genre.name,
          value: genre._id,
        })
      ),

    onError: (error) => toastError(error, 'Genre list	'),
  })

  return queryData
}
