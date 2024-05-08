import { Link, useParams } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import { User } from '../../lib/models/user'
import { useUserState } from '../../stores/user'
import { useEffect, useState } from 'react'
import { Post } from '../../lib/models/post'
import { PostComment } from '../../lib/models/comment'
import { PAGE_URL } from '../../utils/enums'

export const Profile: React.FC = () => {
  const server = import.meta.env.VITE_SERVER_URL

  const { id } = useParams()

  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<PostComment[]>([])
  const [likesReceived, setLikesReceived] = useState<number>(0)

  const [loading, setLoading] = useState<boolean>(true)

  const fetchUserProfile = async () => {
    const { userApi } = useApi()
    try {
      setLoading(true)
      const res = await userApi.getUserProfile(id!)
      setUser(res.user)
      setPosts(res.posts)
      setComments(res.comments)
      setLikesReceived(res.likesReceived)
      setLoading(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  const renderPosts = () => {
    return posts.map((post) => (
      <Link to={`${PAGE_URL.POSTS}/${post._id}`}>
        <img
          key={post._id}
          src={`${server}${post.imagePath}`}
          className="aspect-square object-cover rounded-md"
        />
      </Link>
    ))
  }

  return (
    <div>
      <div className="w-full flex items-center space-x-12">
        <img
          src={`${server}${user?.avatar}`}
          className="w-24 aspect-square object-cover"
        />
        <div className="w-full flex flex-col space-y-4">
          <h1>{user!.username}</h1>
          <div className="w-full flex justify-between">
            <span>{posts.length} posts</span>
            <span>{comments.length} comments</span>
            <span>{likesReceived} likes received</span>
          </div>
        </div>
      </div>
      <hr className="my-10" />
      <div className="grid grid-cols-2 gap-2">{renderPosts()}</div>
    </div>
  )
}
