import dynamic from 'next/dynamic'
import { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import { CommentsItem } from './comments-item/CommentsItem'
import { useComments } from './useComments'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { SubHeading } from '@/components/ui/heading/SubHeading'
import { useAuth } from '@/hooks/useAuth'

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
