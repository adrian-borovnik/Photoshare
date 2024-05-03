import { Request, Response, NextFunction } from 'express'
import { get, merge } from 'lodash'

import { getUserById, getUserBySessionToken } from '../models/user'

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies['AUTH']
    // const sessionToken = req.headers['Authorization'] as string

    if (!sessionToken) return res.sendStatus(403)

    const existingUser = await getUserBySessionToken(sessionToken)

    if (!existingUser) return res.sendStatus(403)

    merge(req, { identity: existingUser })

    return next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

// TODO | Fix this so that it works with other models
export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const currentUserId = get(req, 'identity._id') as unknown as string

    if (!currentUserId) return res.sendStatus(403)

    if (currentUserId.toString() !== id) return res.sendStatus(403)

    return next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
