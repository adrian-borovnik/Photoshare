import { Router } from 'express'

import auth from './auth'
import users from './users'
import posts from './posts'

const router = Router()

export default (): Router => {
  auth(router)
  users(router)
  posts(router)
  return router
}
