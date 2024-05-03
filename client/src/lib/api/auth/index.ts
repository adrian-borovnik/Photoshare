import { $Fetch } from 'ofetch'
import { createFetch } from '../../../config/api'
import { API_RESOURCE, FETCH_METHOD } from '../types'
import { LoginRequest, LoginResponse } from './types'

export const authApi = (fetcher: $Fetch) => {
  const RESOURCE = API_RESOURCE.AUTH
  const fetch = createFetch(fetcher)

  const login = async (requestParams: LoginRequest): Promise<LoginResponse> => {
    console.log('requestParams', requestParams)
    return await fetch(FETCH_METHOD.POST, `${RESOURCE}/login`, requestParams)
  }

  return {
    login,
  }
}
