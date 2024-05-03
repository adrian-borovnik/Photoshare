import { $Fetch } from 'ofetch'

import { userApi } from './user'
import { authApi } from './auth'
import { postApi } from './post'

export const createApiModules = (fetchClient: $Fetch) => {
	return {
		authApi: authApi(fetchClient),
		userApi: userApi(fetchClient),
		postApi: postApi(fetchClient),
	}
}
