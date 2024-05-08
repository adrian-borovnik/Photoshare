import { Request, Response } from 'express'
import { get, merge } from 'lodash'
import { ObjectId } from 'mongodb'

import { getUserIdFromRequest } from '../utils'

import {
  getPosts,
  getPostById,
  createPost as _createPost,
  deletePostById,
  updatePostById,
  likePost as _likePost,
  unlikePost as _unlikePost,
  dislikePost as _dislikePost,
  undislikePost as _undislikePost,
} from '../models/post'

import { deleteCommentByPost } from '../models/comment'

export const listPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getPosts().populate('user').sort({ createdAt: -1 })

    return res.status(200).json(posts).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) return res.sendStatus(400)

    const post = await getPostById(id).populate('user')
    if (!post) return res.sendStatus(404)

    return res.status(200).json(post).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const currentUserId = getUserIdFromRequest(req)
    if (!currentUserId) return res.sendStatus(403)

    const image = get(req, 'file')
    const imagePath = get(image, 'path')?.replace('uploads/', 'img/')

    const { caption } = req.body

    if (!caption || !imagePath) return res.sendStatus(400)

    const post = await _createPost({
      content: caption,
      imagePath,
      user: currentUserId,
    })

    return res.status(200).json(post).end()
    // return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

// TODO | Check if the user is the owner of the post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) return res.sendStatus(400)

    const { content, imagePath } = req.body

    const post = await getPostById(id)
    if (!post) return res.sendStatus(404)

    if (content) post.content = content
    if (imagePath) post.imagePath = imagePath

    post.save()

    return res.status(200).json(post).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

// TODO | Check if the user is the owner of the post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) return res.sendStatus(400)

    const deletedPost = await deletePostById(id)
    if (!deletedPost) return res.sendStatus(404)

    await deleteCommentByPost(id)

    return res.status(200).json(deletedPost).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const likePost = async (req: Request, res: Response) => {
  try {
    const currentUserId = getUserIdFromRequest(req)
    if (!currentUserId) return res.sendStatus(403)

    const { id } = req.params
    if (!id) return res.sendStatus(400)

    const post = await getPostById(id)
    if (!post) return res.sendStatus(404)

    let unLiked = null

    post.likes.forEach((objectId, index) => {
      if (objectId.toString() === currentUserId.toString()) {
        unLiked = post.likes.splice(index, 1)
        return
      }
    })

    if (!unLiked) {
      post.likes.push(new ObjectId(currentUserId))
      post.dislikes = post.dislikes.filter(
        (objectId) => objectId.toString() !== currentUserId.toString()
      )
    }

    post.save()

    // const likedPost = await _likePost(id, currentUserId)
    // const unDislikedPost = await _undislikePost(id, currentUserId)

    return res.status(200).json(post).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const dislikePost = async (req: Request, res: Response) => {
  try {
    const currentUserId = getUserIdFromRequest(req)
    if (!currentUserId) return res.sendStatus(403)

    const { id } = req.params
    if (!id) return res.sendStatus(400)

    const post = await getPostById(id)
    if (!post) return res.sendStatus(404)

    let unDisliked = null

    post.dislikes.forEach((objectId, index) => {
      if (objectId.toString() === currentUserId.toString()) {
        unDisliked = post.dislikes.splice(index, 1)
        return
      }
    })

    if (!unDisliked) {
      post.dislikes.push(new ObjectId(currentUserId))
      post.likes = post.likes.filter(
        (objectId) => objectId.toString() !== currentUserId.toString()
      )
    }

    post.save()

    return res.status(200).json(post).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
