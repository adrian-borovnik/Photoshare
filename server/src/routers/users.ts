import { Router } from 'express'

import { isAuthenticated, isOwner } from '../middlewares'
import {
  deleteUser,
  getSelf,
  getUser,
  listUsers,
  updateUser,
  getUserProfile,
} from '../controllers/users'

export default (router: Router) => {
  router.get('/users', isAuthenticated, listUsers)
  router.get('/users/self', getSelf)
  router.get('/users/:id', getUserProfile)

  router.put('/users/:id', isAuthenticated, isOwner, updateUser)
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser)
}
