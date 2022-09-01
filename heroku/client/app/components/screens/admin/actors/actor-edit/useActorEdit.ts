import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { IActorEditInput } from './actor-edit.types'
import { getAdminUrl } from '@/config/url.config'
import { ActorService } from '@/services/actor.service'
import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
  const { push, query } = useRouter()

  const actorId = String(query.id)

  const { isLoading } = useQuery(
    ['actor', actorId],
    () => ActorService.getById(actorId),
    {
      onSuccess: ({ data }) => {
        getKeys(data).forEach((key) => {
          setValue(key, data[key])
        })
      },
      onError: (error) => toastError(error, 'get actor'),
      enabled: !!query.id,
    }
  )

  const { mutateAsync } = useMutation(
    ['update genre'],
    (data: IActorEditInput) => ActorService.update(actorId, data),
    {
      onError: (error) => toastError(error, 'Update genre'),
      onSuccess: () => {
        toastr.success('Update actor', 'update was successfully')
        push(getAdminUrl('actors'))
      },
    }
  )

  const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}
