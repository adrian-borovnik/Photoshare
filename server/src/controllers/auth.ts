import { Request, Response } from 'express'
import { getUserByEmail, createUser, getUserByUsername } from '../models/user'
import { authentication, random } from '../utils'

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    if (!username || !password)
      return res.status(400).json({ message: 'Missing required fields' })

    const user = await getUserByUsername(username).select(
      '+auth.salt +auth.password'
    )

    if (!user)
      return res.status(400).json({ message: 'User is not registered' })

    const expectedHash = authentication(user.auth!.salt, password)

    if (expectedHash !== user.auth!.password)
      return res.status(403).json({ message: 'Invalid username or password' })

    const salt = random()
    user.auth!.sessionToken = authentication(salt, user._id.toString())

    await user.save()

    res.cookie('AUTH', user.auth!.sessionToken, {
      domain: 'localhost',
      path: '/',
    })

    return res.status(200).json(user).end()
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: 400, message: 'Error logging user' })
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password)
      return res.status(400).json({ message: 'Missing required fields' })

    const existingUser = await getUserByEmail(email)

    if (existingUser)
      return res.status(400).json({ message: 'User already exists' })

    const salt = random()
    const user = await createUser({
      username,
      email,
      auth: {
        password: authentication(salt, password),
        salt,
      },
      avatar: 'img/default-avatar.png',
    })

    return res.status(200).json(user).end()
  } catch (error) {
    console.error(error)
    res.status(400).json({ status: 400, message: 'Error registering user' })
  }
}
