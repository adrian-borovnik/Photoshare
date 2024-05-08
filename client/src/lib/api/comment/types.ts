import { PostComment } from '../../models/comment'
import { Post } from '../../models/post'

export type PostCommentListResponse = PostComment[]

export type PostCommentRequest = Pick<PostComment, '_id'>

export type PostCommentResponse = PostComment

export type PostCommentCreateRequest = Pick<PostComment, 'content'> & {
  postId: Post['_id']
}
