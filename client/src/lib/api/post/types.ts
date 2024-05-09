import { Post } from '../../models/post'

export type PostListResponse = Post[]

export type PostRequest = Pick<Post, '_id'>
export type PostResponse = Post

export type PostCreateRequest = Pick<Post, 'content'> & {
  image: File
}

export type PostReportResponse = PostResponse
