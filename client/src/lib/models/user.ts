export type User = {
  username: string
  email: string
  auth: {
    password: string
    sessionToken: string
    salt: string
  }
  // posts: Post[]
  // comments: Comment[]
}
