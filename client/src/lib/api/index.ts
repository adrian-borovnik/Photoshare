import { $Fetch } from 'ofetch'

import { userApi } from './user'
import { authApi } from './auth'

export const createApiModules = (fetchClient: $Fetch) => {
  return {
    authApi: authApi(fetchClient),
    userApi: userApi(fetchClient),
  }
}
