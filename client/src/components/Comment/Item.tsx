import React from 'react'
import { PostComment } from '../../lib/models/comment'

interface Props {
  comment: PostComment
}

export const CommentItem: React.FC<Props> = ({ comment }: Props) => {
  const server = import.meta.env.VITE_SERVER_URL
  const avatarSrc = `${server}${comment.user.avatar}`

  return (
    <div className="flex items-start space-x-4">
      <img src={avatarSrc} className="aspect-square h-full rounded-full w-8" />
      <div>
        <p className="font-semibold">{comment.user.username}</p>
        <p>{comment.content}</p>
      </div>
    </div>
  )
}
