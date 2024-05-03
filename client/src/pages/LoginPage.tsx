import { AuthLogin } from '../components/Auth/Login'
import { AuthLayout } from '../layout/auth'

export const LoginPage: React.FC = () => {
	return (
		<AuthLayout>
			<AuthLogin />
		</AuthLayout>
	)
}
