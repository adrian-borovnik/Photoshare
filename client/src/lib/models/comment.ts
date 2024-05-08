import { Timestamps } from '.'
import { User } from './user'

export type PostComment = {
  _id: string
  user: User
  post: string
  content: string
} & Timestamps
