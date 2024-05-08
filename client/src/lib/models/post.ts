import { Timestamps } from '.'
import { User } from './user'

export type Post = {
  _id: string
  content: string
  imagePath: string
  user: User
  likes: string[]
  dislikes: string[]
  // comments: Comment[]
} & Timestamps
