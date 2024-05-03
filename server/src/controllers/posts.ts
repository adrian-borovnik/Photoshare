import { Request, Response } from 'express'
import { get, merge } from 'lodash'

import { getUserIdFromRequest } from '../utils'

import { getPosts, getPostById, createPost as _createPost, deletePostById, updatePostById } from '../models/post'

import { deleteCommentByPost } from '../models/comment'

export const listPosts = async (req: Request, res: Response) => {
	try {
		const posts = await getPosts().populate('user').populate('comments')

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

		const post = await getPostById(id).populate('user').populate('comments')
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

		const { content, imagePath } = req.body
		if (!content || !imagePath) return res.sendStatus(400)

		const post = await _createPost({
			content,
			imagePath,
			user: currentUserId,
		})

		return res.status(200).json(post).end()
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
		console.log(content, imagePath)

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
