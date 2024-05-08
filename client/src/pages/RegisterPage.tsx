import { AuthRegister } from '../components/Auth/Register'
import { AuthLayout } from '../layout/auth'

export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout>
      <AuthRegister />
    </AuthLayout>
  )
}
