import { Router } from 'express'

import { isAuthenticated, isOwner } from '../middlewares'
import {
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from '../controllers/users'

export default (router: Router) => {
  router.get('/users', isAuthenticated, listUsers)
  router.get('/users/:id', getUser)
  router.put('/users/:id', isAuthenticated, isOwner, updateUser)
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser)
}
