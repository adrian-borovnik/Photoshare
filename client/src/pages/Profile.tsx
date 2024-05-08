import { useParams } from 'react-router-dom'
import { Profile } from '../components/Profile'
import { Layout } from '../layout/default'
import { useUserState } from '../stores/user'
import { useEffect } from 'react'

export const ProfilePage: React.FC = () => {
  return (
    <Layout>
      <Profile />
    </Layout>
  )
}
