import { Router } from 'express'

import { isAuthenticated, isOwner } from '../middlewares'
import {
  createPost,
  deletePost,
  getPost,
  listPosts,
  updatePost,
} from '../controllers/posts'

export default (router: Router) => {
  router.get('/posts', listPosts)
  router.get('/posts/:id', getPost)
  router.put('/posts/:id', isAuthenticated, updatePost)
  router.delete('/posts/:id', isAuthenticated, deletePost)
  router.post('/posts', isAuthenticated, createPost)
}
