import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Post } from '../../lib/models/post'
import { useApi } from '../../hooks/useApi'
import { PostItem } from './Item'
import { PostComment } from '../../lib/models/comment'
import { CommentCreate } from '../Comment/Create'
import { CommentList } from '../Comment/List'
import { useUserState } from '../../stores/user'

export const PostDetails: React.FC = () => {
  const { id } = useParams()

  const user = useUserState.getState().user

  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<PostComment[]>([])

  const fetchPost = async () => {
    const { postApi } = useApi()
    try {
      const res = await postApi.getPost(id!)
      setPost(res)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchComments = async () => {
    const { commentApi } = useApi()
    try {
      const res = await commentApi.listCommentsByPost(id!)
      setComments(res)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [])

  return (
    <div className="flex flex-col space-y-12">
      {post && <PostItem post={post} />}
      <div className="flex flex-col space-y-8">
        {user && <CommentCreate fetchMethod={fetchComments} />}
        <CommentList comments={comments} />
      </div>
    </div>
  )
}
