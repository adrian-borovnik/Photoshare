import { Request, Response } from 'express'

import { deleteUserById, getUsers, getUserById } from '../models/user'
import { deletePostByUser } from '../models/post'
import { deleteCommentByUser } from '../models/comment'

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers()

    return res.status(200).json(users).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) return res.sendStatus(400)

    const user = await getUserById(id)
    if (!user) return res.sendStatus(404)

    return res.status(200).json(user).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { username, email } = req.body

    if (!id) return res.sendStatus(400)

    const user = await getUserById(id)
    if (!user) return res.sendStatus(404)

    if (username) user.username = username
    if (email) user.email = email

    await user.save()

    return res.status(200).json(user).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) return res.sendStatus(400)

    const deletedUser = await deleteUserById(id)
    if (!deletedUser) return res.sendStatus(404)

    await Promise.all([deletePostByUser(id), deleteCommentByUser(id)])

    return res.status(200).json(deletedUser).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
