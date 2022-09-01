import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, Fragment, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import { CommentForm } from './comment-form/CommentForm'
import { CommentsItem } from './comments-item/CommentstItem'
import { useComments } from './useComments'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { SubHeading } from '@/components/ui/heading/SubHeading'
import { useAuth } from '@/hooks/useAuth'
import { CommentService } from '@/services/comment.service'
import { IComment } from '@/shared/types/movie.types'

export const Comments: FC<{ movieId: string }> = ({ movieId }) => {
  const { user } = useAuth()
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    deleteAsync,
    isDeleteLoading,
  } = useComments(movieId)

  const DynamicCommentForm = dynamic(
    () => import('./comment-form/CommentForm').then((mod) => mod.CommentForm),
    {
      ssr: false,
    }
  )

  return (
    <div className="mt-12">
      <SubHeading title="Comments" />
      {user && <DynamicCommentForm movieId={movieId} />}
      {data?.pages[0].data.data[0] ? (
        <InfiniteScroll
          pageStart={0}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
        >
          {isLoading ? (
            <SkeletonLoader count={5} />
          ) : (
            data &&
            data.pages?.map((item) =>
              item.data.data?.map((item) => (
                <CommentsItem
                  isLoading={isDeleteLoading}
                  deleteComment={deleteAsync}
                  key={item._id}
                  data={item}
                />
              ))
            )
          )}
        </InfiniteScroll>
      ) : (
        <div className="text-white">Comments not found</div>
      )}
    </div>
  )
}
