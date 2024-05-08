import { Request, Response } from 'express'

import {
  getComments,
  getCommentById,
  createComment as _createComment,
  updateCommentById,
  deleteCommentById,
  getCommentByPost,
} from '../models/comment'

import { getUserIdFromRequest } from '../utils'
import { addComment } from '../models/post'

export const listComments = async (req: Request, res: Response) => {
  try {
    const comments = await getComments()
      .populate('user')
      .populate('post')
      .sort({ createdAt: -1 })

    return res.status(200).json(comments).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const listCommentsByPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) return res.sendStatus(400)

    const comments = await getCommentByPost(id)
      .populate('user')
      .sort({ createdAt: -1 })

    return res.status(200).json(comments).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const getComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) return res.sendStatus(400)

    const comment = await getCommentById(id).populate('user').populate('post')
    if (!comment) return res.sendStatus(404)

    return res.status(200).json(comment).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, postId } = req.body
    const currentUserId = getUserIdFromRequest(req)
    if (!currentUserId || !content || !postId) return res.sendStatus(400)

    const comment = await _createComment({
      content,
      user: currentUserId,
      post: postId,
    })

    await addComment(postId, comment._id.toString())

    return res.status(200).json(comment).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { content } = req.body
    const currentUserId = getUserIdFromRequest(req)
    if (!currentUserId || !content || !id) return res.sendStatus(400)

    const comment = await updateCommentById(id, { content })

    return res.status(200).json(comment).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const currentUserId = getUserIdFromRequest(req)
    if (!currentUserId || !id) return res.sendStatus(400)

    await deleteCommentById(id)

    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
