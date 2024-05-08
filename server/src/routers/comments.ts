import { Router } from 'express'

import { isAuthenticated } from '../middlewares'

import {
  createComment,
  deleteComment,
  getComment,
  listComments,
  listCommentsByPost,
  updateComment,
} from '../controllers/comment'

export default (router: Router) => {
  router.get('/comments', listComments)
  router.get('/comments/post/:id', listCommentsByPost)

  router.post('/comments', isAuthenticated, createComment)
  router.put('/comments/:id', isAuthenticated, updateComment)
  router.delete('/comments/:id', isAuthenticated, deleteComment)
}
