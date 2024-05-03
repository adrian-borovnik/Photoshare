import { Link } from 'react-router-dom'

interface Props {
	text: string
	icon?: React.ReactNode
	url: string
}

export const NavigationItem: React.FC<Props> = ({ text, icon, url }: Props) => {
	return (
		<Link
			to={url}
			className='w-full flex justify-start items-center space-x-2 p-2 rounded-md hover:bg-slate-100 transition-colors duration-200 ease-in-out'
		>
			{icon ?? null}
			<span className='text-base'>{text}</span>
		</Link>
	)
}
