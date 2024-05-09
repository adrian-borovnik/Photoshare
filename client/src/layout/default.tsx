import React, { useEffect } from 'react'
import { Navigation } from '../components/Navigation'
import { useApi } from '../hooks/useApi'
import { useCookies } from 'react-cookie'
import { useUserState } from '../stores/user'
import { useNavigate } from 'react-router-dom'
import { PAGE_URL } from '../utils/enums'

interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="h-auto min-h-screen flex">
      <Navigation />
      <main className="h-fit flex-1 flex flex-col items-center p-16 ml-64">
        <div className="w-full max-w-2xl">{children}</div>
      </main>
    </div>
  )
}
