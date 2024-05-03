import React, { useEffect, useState } from 'react'
import { useApi } from '../hooks/useApi'
import { Button, FormControl, FormLabel, Input } from '@mui/joy'

import { CookiesProvider, useCookies } from 'react-cookie'

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [cookies, setCookie] = useCookies(['AUTH'])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('login', username, password)

    const { authApi } = useApi()
    await authApi
      .login({ username, password })
      .then((response) => {
        console.log(response)
        setCookie('AUTH', response.auth.sessionToken, {
          path: '/',
          domain: 'localhost',
        })
      })
      .catch((error) => {
        console.log('error')
        console.error(error)
      })
  }

  return (
    <div>
      <form onSubmit={(e) => handleLogin(e)}>
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
          <Button type="submit">Login</Button>
        </FormControl>
      </form>
    </div>
  )
}
