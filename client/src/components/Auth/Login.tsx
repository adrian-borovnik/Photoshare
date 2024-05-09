import { Button, FormControl, FormLabel, Input } from '@mui/joy'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useApi } from '../../hooks/useApi'
import { useUserState } from '../../stores/user'

import { Link, useNavigate } from 'react-router-dom'
import { PAGE_URL } from '../../utils/enums'

export const AuthLogin: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [cookies, setCookie] = useCookies(['AUTH'])

  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('login', username, password)

    const { authApi } = useApi()
    await authApi
      .login({ username, password })
      .then((res) => {
        setCookie('AUTH', res.auth.sessionToken, {
          path: '/',
          domain: 'localhost',
        })

        useUserState.setState({ user: res })

        navigate(PAGE_URL.HOME)
      })
      .catch((error) => {
        console.log('error')
        console.error(error)
      })
  }

  useEffect(() => {
    // clear AUTH cookie
    setCookie('AUTH', '', { path: '/', domain: 'localhost' })
    useUserState.setState({ user: null })
  }, [])

  return (
    <div className="flex flex-col space-y-6 items-center">
      <h1 className="text-3xl font-bold">Login</h1>
      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col space-y-4 w-96"
      >
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit">Login</Button>
      </form>
      <Link to={PAGE_URL.REGISTER}>Create new account</Link>
    </div>
  )
}
