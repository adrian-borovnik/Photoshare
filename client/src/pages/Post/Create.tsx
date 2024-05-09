import { AuthGuard } from '../../components/Auth/Guard'
import { PostCreate } from '../../components/Post/Create'
import { Layout } from '../../layout/default'

export const PostCreatePage: React.FC = () => {
  return (
    <Layout>
      <AuthGuard>
        <PostCreate />
      </AuthGuard>
    </Layout>
  )
}
