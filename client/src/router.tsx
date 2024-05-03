import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { PAGE_URL } from './utils/enums'
import { PostCreatePage } from './pages/Post/Create'

export const AppRouter: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={PAGE_URL.HOME}
					element={<HomePage />}
				/>
				<Route
					path={PAGE_URL.LOGIN}
					element={<LoginPage />}
				/>
				<Route
					path={PAGE_URL.REGISTER}
					element={<HomePage />}
				/>
				<Route
					path={PAGE_URL.POSTS_CREATE}
					element={<PostCreatePage />}
				/>
				<Route
					path='/profile'
					element={<HomePage />}
				/>
				<Route
					path='/'
					element={<HomePage />}
				/>
				<Route
					path='/'
					element={<HomePage />}
				/>
			</Routes>
		</BrowserRouter>
	)
}
