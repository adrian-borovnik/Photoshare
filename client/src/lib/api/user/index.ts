import { $Fetch } from 'ofetch'
import { createFetch } from '../../../config/api'
import { API_RESOURCE, FETCH_METHOD } from '../types'
import { UserListResponse } from './types'

export const userApi = (fetcher: $Fetch) => {
	const RESOURCE = API_RESOURCE.USER
	const fetch = createFetch(fetcher)

	const getUserList = async (): Promise<UserListResponse> => {
		// TODO | Encode params in the URL
		return await fetch(FETCH_METHOD.GET, RESOURCE)
	}

	return {
		getUserList,
	}
}
