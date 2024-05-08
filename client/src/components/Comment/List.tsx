import { PostComment } from '../../lib/models/comment'
import { CommentItem } from './Item'

interface Props {
  comments: PostComment[]
}

export const CommentList: React.FC<Props> = ({ comments }: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  )
}
