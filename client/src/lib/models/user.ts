import { Timestamps } from '.'

export type User = {
  _id: string
  username: string
  avatar: string
  email: string
  auth: {
    password: string
    sessionToken: string
    salt: string
  }
} & Timestamps
