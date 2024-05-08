import { $Fetch } from 'ofetch'
import { createFetch } from '../../../config/api'
import { API_RESOURCE, FETCH_METHOD } from '../types'
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from './types'

export const authApi = (fetcher: $Fetch) => {
  const RESOURCE = API_RESOURCE.AUTH
  const fetch = createFetch(fetcher)

  const login = async (requestParams: LoginRequest): Promise<LoginResponse> => {
    return await fetch(FETCH_METHOD.POST, `${RESOURCE}/login`, requestParams)
  }

  const register = async (
    requestParams: RegisterRequest
  ): Promise<RegisterResponse> => {
    return await fetch(FETCH_METHOD.POST, `${RESOURCE}/register`, requestParams)
  }

  return {
    login,
    register,
  }
}
