import React from 'react'
import { Navigation } from '../components/Navigation'

interface Props {
	children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }: Props) => {
	return (
		<div className='h-auto min-h-screen flex'>
			<Navigation />
			<main className='h-fit flex-1 flex flex-col items-center p-16 ml-64'>
				<div className='w-full max-w-xl'>{children}</div>
			</main>
		</div>
	)
}
