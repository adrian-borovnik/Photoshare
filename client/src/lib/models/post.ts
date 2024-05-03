import { Timestamps } from '.'
import { User } from './user'

export type Post = {
	_id: string
	content: string
	imagePath: string
	user: User
	likes: User[]
	dislikes: User[]
	// comments: Comment[]
} & Timestamps
