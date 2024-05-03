import { HomeRounded, AddCircleOutlineRounded } from '@mui/icons-material'
import { PAGE_URL } from '../../utils/enums'
import { NavigationItem } from './Item'

export const Navigation: React.FC = () => {
	return (
		<div className='fixed w-64 h-screen flex flex-col justify-between p-4 border-r-grey-200 border-r-2'>
			<div className='flex flex-col space-y-2'>
				<NavigationItem
					text='Home'
					icon={<HomeRounded />}
					url={PAGE_URL.HOME}
				/>
				<NavigationItem
					text='Upload Post'
					icon={<AddCircleOutlineRounded />}
					url={PAGE_URL.POSTS_CREATE}
				/>
			</div>
			<div className='flex flex-col space-y-2'>
				<NavigationItem
					text='Login'
					url={PAGE_URL.LOGIN}
				/>
			</div>
		</div>
	)
}
