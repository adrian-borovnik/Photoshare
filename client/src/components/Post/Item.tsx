import { Button, IconButton } from '@mui/joy'
import { Post } from '../../lib/models/post'
import {
  FavoriteBorderRounded,
  FavoriteRounded,
  ThumbDownOffAltRounded,
  ThumbDownRounded,
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { useUserState } from '../../stores/user'
import { Link } from 'react-router-dom'
import { PAGE_URL } from '../../utils/enums'

interface Props {
  post: Post
}

export const PostItem: React.FC<Props> = ({ post }: Props) => {
  const user = useUserState.getState().user

  const server = import.meta.env.VITE_SERVER_URL
  const imagePath = post.imagePath
  const imgSrc = `${server}${imagePath}`
  const avatarSrc = `${server}${post.user.avatar}`
  console.log('imgSrc', imgSrc)
  console.log('avatarSrc', avatarSrc)

  const [liked, setLiked] = useState<boolean>(false)
  const [likes, setLikes] = useState<number>(post.likes.length)

  const [disliked, setDisliked] = useState<boolean>(false)
  const [dislikes, setDislikes] = useState<number>(post.dislikes.length)

  const { postApi } = useApi()

  const handleSetLikeAndDislike = () => {
    if (!user) return

    setLikes(post.likes.length)
    setLiked(post.likes.includes(user!._id))

    setDislikes(post.dislikes.length)
    setDisliked(post.dislikes.includes(user!._id))
  }

  const handleLike = async () => {
    try {
      post = await postApi.likePost(post._id)
      handleSetLikeAndDislike()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDislike = async () => {
    try {
      post = await postApi.dislikePost(post._id)
      handleSetLikeAndDislike()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleSetLikeAndDislike()
  }, [])

  const renderControlButtons = () => (
    <div className="flex items-center space-x-1">
      <IconButton
        variant="plain"
        size="lg"
        color={liked ? 'danger' : 'neutral'}
        onClick={handleLike}
      >
        {liked ? <FavoriteRounded /> : <FavoriteBorderRounded />}
      </IconButton>
      <IconButton
        variant="plain"
        size="lg"
        color={disliked ? 'primary' : 'neutral'}
        onClick={handleDislike}
      >
        {disliked ? <ThumbDownRounded /> : <ThumbDownOffAltRounded />}
      </IconButton>
    </div>
  )

  return (
    <div className="w-full flex flex-col space-y-2">
      <Link
        to={`${PAGE_URL.PROFILE}/${post.user._id}`}
        className="flex items-center space-x-3 w-fit"
      >
        <img
          src={avatarSrc}
          className="aspect-square h-10 rounded-full object-cover"
        />
        <h2>{post.user.username}</h2>
      </Link>

      <Link to={`${PAGE_URL.POSTS}/${post._id}`}>
        <img src={imgSrc} className="w-full object-contain rounded" />
      </Link>
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between">
          {user && renderControlButtons()}
          <div className="flex space-x-2">
            <p className="px-2">{likes} Likes</p>
            <p className="px-2">{dislikes} Dislikes</p>
          </div>
        </div>
        <p className="text-sm">{post.content}</p>
      </div>
    </div>
  )
}
