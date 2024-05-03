import { useEffect, useState } from 'react'
import { useApi } from '../hooks/useApi'
import { UserListResponse } from '../lib/api/user/types'
import { Button } from '@mui/joy'

export const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<UserListResponse>([])
  const [error, setError] = useState<string | null>(null)

  const handleFetch = async () => {
    const { userApi } = useApi()
    await userApi
      .getUserList()
      .then((response) => {
        setPosts(response)
      })
      .catch((error) => {
        console.error(error)
        setError(error)
      })
  }

  useEffect(() => {
    handleFetch()
  }, [])

  return (
    <div>
      <Button onClick={handleFetch}>Fetch</Button>
    </div>
  )
}
