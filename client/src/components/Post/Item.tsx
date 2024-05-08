import { Post } from '../../lib/models/post'

interface Props {
  post: Post
}

export const PostItem: React.FC<Props> = ({ post }: Props) => {
  const server = import.meta.env.VITE_SERVER_URL
  const imagePath = post.imagePath

  const src = `${server}${imagePath}`

  console.log(server, imagePath)

  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="flex items-center space-x-3">
        <img
          src={post.user.avatar}
          className="aspect-square h-10 rounded-full object-cover"
        />
        <h2>{post.user.username}</h2>
      </div>
      <img src={src} className="w-full object-contain w-full" />
      <div className="flex flex-col space-y-1">
        <div></div>
        <p className="text-sm">{post.content}</p>
        <p>{post.createdAt}</p>
      </div>
    </div>
  )
}
