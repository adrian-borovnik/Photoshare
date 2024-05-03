import { Layout } from '../layout/default'

import { PostList } from '../components/Post/List'

export const HomePage: React.FC = () => {
	return (
		<Layout>
			<PostList />
		</Layout>
	)
}
