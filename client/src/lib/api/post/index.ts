import { $Fetch } from 'ofetch'
import { createFetch } from '../../../config/api'
import { API_RESOURCE, FETCH_METHOD } from '../types'
import { PostCreateRequest, PostListResponse, PostResponse } from './types'

export const postApi = (fetcher: $Fetch) => {
	const RESOURCE = API_RESOURCE.POST
	const fetch = createFetch(fetcher)

	const getPostList = async (): Promise<PostListResponse> => {
		// TODO | Encode params in the URL
		return await fetch(FETCH_METHOD.GET, RESOURCE)
	}

	const getPost = async (id: string): Promise<PostResponse> => {
		return await fetch(FETCH_METHOD.GET, `${RESOURCE}/${id}`)
	}

	const createPost = async (requestParams: PostCreateRequest): Promise<PostResponse> => {
		return await fetch(FETCH_METHOD.POST, RESOURCE, requestParams)
	}

	return {
		getPostList,
		getPost,
		createPost,
	}
}
