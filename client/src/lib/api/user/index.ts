import { $Fetch } from 'ofetch'
import { createFetch } from '../../../config/api'
import { API_RESOURCE, FETCH_METHOD } from '../types'
import {
  UserListResponse,
  UserProfileResponse,
  UserResponse,
  UserSelfRequest,
} from './types'

export const userApi = (fetcher: $Fetch) => {
  const RESOURCE = API_RESOURCE.USER
  const fetch = createFetch(fetcher)

  const getSelf = async (
    requestParams: UserSelfRequest
  ): Promise<UserResponse> => {
    return await fetch(FETCH_METHOD.GET, `${RESOURCE}/self`)
  }

  const getUserList = async (): Promise<UserListResponse> => {
    return await fetch(FETCH_METHOD.GET, RESOURCE)
  }

  const getUser = async (userId: string): Promise<UserResponse> => {
    return await fetch(FETCH_METHOD.GET, `${RESOURCE}/${userId}`)
  }

  const getUserProfile = async (
    userId: string
  ): Promise<UserProfileResponse> => {
    return await fetch(FETCH_METHOD.GET, `${RESOURCE}/${userId}`)
  }

  return {
    getUserList,
    getSelf,
    getUser,
    getUserProfile,
  }
}
