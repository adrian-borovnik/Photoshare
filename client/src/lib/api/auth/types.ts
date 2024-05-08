import { User } from '../../models/user'

export type LoginRequest = {
  username: string
  password: string
}
export type LoginResponse = User

export type RegisterRequest = {
  username: string
  email: string
  password: string
}

export type RegisterResponse = User
