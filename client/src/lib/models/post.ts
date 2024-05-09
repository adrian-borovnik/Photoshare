import { Timestamps } from '.'
import { User } from './user'
import { PostComment } from './comment'

export type Post = {
  _id: string
  content: string
  imagePath: string
  user: User
  likes: string[]
  dislikes: string[]
  comments: PostComment[]
  reports: string[]
} & Timestamps
