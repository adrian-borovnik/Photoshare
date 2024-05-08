import { PostComment } from '../../models/comment'
import { Post } from '../../models/post'
import { User } from '../../models/user'

export type UserListResponse = User[]

export type UserResponse = User

export type UserProfileResponse = {
  user: User
  posts: Post[]
  comments: PostComment[]
  likesReceived: number
}

export type UserSelfRequest = {
  sessionToken: string
}
