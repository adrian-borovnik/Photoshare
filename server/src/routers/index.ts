import { Router } from 'express'

import auth from './auth'
import users from './users'
import posts from './posts'
import comments from './comments'

const router = Router()

export default (): Router => {
  auth(router)
  users(router)
  posts(router)
  comments(router)
  return router
}
