import { useEffect, useState } from 'react'
import { PostListResponse } from '../../lib/api/post/types'
import { useApi } from '../../hooks/useApi'
import { PostItem } from './Item'

export const PostList: React.FC = () => {
	const [posts, setPosts] = useState<PostListResponse>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handleFetch = async () => {
		const { postApi } = useApi()
		try {
			setLoading(true)
			const response = await postApi.getPostList()
			setPosts(response)
			setLoading(false)
		} catch (error) {
			setError(error as string)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		handleFetch()
	}, [])

	const renderPosts = () => {
		return posts.map((post) => (
			<PostItem
				key={post._id}
				post={post}
			/>
		))
	}

	return (
		<div className='flex flex-col space-y-16'>
			{error && <p>{error}</p>}
			{loading && <p>Loading...</p>}
			{!loading && renderPosts()}
		</div>
	)
}
