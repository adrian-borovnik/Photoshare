import { User } from '../../models/user'

export type LoginRequest = {
  username: string
  password: string
}
export type LoginResponse = User
