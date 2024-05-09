import { Router } from 'express'

import { isAuthenticated, isOwner } from '../middlewares'
import {
  createPost,
  deletePost,
  getPost,
  listPosts,
  updatePost,
  likePost,
  dislikePost,
  reportPost,
} from '../controllers/posts'

import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads/'),
  filename: (_req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)), //Appending extension
})

const upload = multer({ storage })

export default (router: Router) => {
  router.get('/posts', listPosts)
  router.get('/posts/:id', getPost)

  router.put('/posts/:id/like', isAuthenticated, likePost)
  router.put('/posts/:id/dislike', isAuthenticated, dislikePost)
  router.put('/posts/:id/report', isAuthenticated, reportPost)
  router.put('/posts/:id', isAuthenticated, updatePost)

  router.delete('/posts/:id', isAuthenticated, deletePost)

  router.post('/posts', isAuthenticated, upload.single('image'), createPost)
}
