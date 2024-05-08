import crypto from 'crypto'
import { Request } from 'express'
import { get } from 'lodash'

const SECRET = process.env.SECRET || 'secret'

export const random = () => crypto.randomBytes(128).toString('base64')
export const authentication = (salt: string, password: string) =>
  crypto
    .createHmac('sha512', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex')

export const getUserIdFromRequest = (req: Request) => {
  const currentUserId = get(req, 'identity._id') as unknown as string
  return currentUserId
}
