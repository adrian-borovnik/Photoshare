import {
  HomeRounded,
  AddCircleOutlineRounded,
  AccountCircleRounded,
} from '@mui/icons-material'
import { PAGE_URL } from '../../utils/enums'
import { NavigationItem } from './Item'
import { useUserState } from '../../stores/user'

export const Navigation: React.FC = () => {
  const user = useUserState.getState().user

  return (
    <div className="fixed w-64 h-screen flex flex-col justify-between p-4 border-r-grey-200 border-r-2">
      <div className="flex flex-col space-y-2">
        <NavigationItem
          text="Home"
          icon={<HomeRounded />}
          url={PAGE_URL.HOME}
        />
        {user && (
          <>
            <NavigationItem
              text="Upload Post"
              icon={<AddCircleOutlineRounded />}
              url={`${PAGE_URL.POSTS}/create`}
            />
            <NavigationItem
              text="Profile"
              icon={<AccountCircleRounded />}
              url={`${PAGE_URL.PROFILE}/${user!._id}`}
            />
          </>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <NavigationItem text="Logout" url={PAGE_URL.LOGIN} />
      </div>
    </div>
  )
}
