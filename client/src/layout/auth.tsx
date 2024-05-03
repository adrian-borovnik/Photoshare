import React from 'react'

interface Props {
	children: React.ReactNode
}

export const AuthLayout: React.FC<Props> = ({ children }: Props) => {
	return (
		<div className='h-auto min-h-screen flex'>
			<main className='h-screen flex-1 flex flex-col justify-center items-center p-16'>
				<div className='w-full max-w-xl'>{children}</div>
			</main>
		</div>
	)
}
