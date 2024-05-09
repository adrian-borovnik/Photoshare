import { useEffect, useState } from 'react'
import { useUserState } from '../../stores/user'
import { PAGE_URL } from '../../utils/enums'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

export const AuthGuard: React.FC<Props> = ({ children }: Props) => {
  const user = useUserState((state) => state.user)
  const navigate = useNavigate()

  const [guard, setGuard] = useState<boolean>(false)

  useEffect(() => {
    if (!user) navigate(PAGE_URL.LOGIN)
    setGuard(true)
  }, [])

  if (!guard) return

  return <>{children}</>
}
