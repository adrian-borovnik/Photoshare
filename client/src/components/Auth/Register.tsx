import { Button, FormControl, FormLabel, Input } from '@mui/joy'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useApi } from '../../hooks/useApi'
import { useUserState } from '../../stores/user'

import { useNavigate } from 'react-router-dom'
import { PAGE_URL } from '../../utils/enums'

export const AuthRegister: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [cookies, setCookie] = useCookies(['AUTH'])

  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    const { authApi } = useApi()
    await authApi
      .register({ email, username, password })
      .then(() => {
        navigate(PAGE_URL.LOGIN)
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
    <div>
      <form
        onSubmit={(e) => handleRegister(e)}
        className="flex flex-col space-y-4"
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
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
    </div>
  )
}
