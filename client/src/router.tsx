import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { PAGE_URL } from './utils/enums'
import { PostCreatePage } from './pages/Post/Create'
import { PostDetailsPage } from './pages/Post/Details'
import { ProfilePage } from './pages/Profile'
import { useUserState } from './stores/user'

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGE_URL.HOME} element={<HomePage />} />
        <Route path={PAGE_URL.LOGIN} element={<LoginPage />} />
        <Route path={PAGE_URL.REGISTER} element={<HomePage />} />
        <Route path={`${PAGE_URL.POSTS}/create`} element={<PostCreatePage />} />
        <Route path={`${PAGE_URL.POSTS}/:id`} element={<PostDetailsPage />} />
        <Route path={`${PAGE_URL.PROFILE}/:id`} element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
