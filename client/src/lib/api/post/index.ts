import { $Fetch } from 'ofetch'
import { createFetch } from '../../../config/api'
import { API_RESOURCE, FETCH_METHOD } from '../types'
import {
  PostCreateRequest,
  PostListResponse,
  PostReportResponse,
  PostResponse,
} from './types'

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

  const createPost = async (formData: FormData): Promise<PostResponse> => {
    return await fetch(FETCH_METHOD.POST, RESOURCE, formData)
  }

  const likePost = async (id: string): Promise<PostResponse> => {
    return await fetch(FETCH_METHOD.PUT, `${RESOURCE}/${id}/like`)
  }

  const dislikePost = async (id: string): Promise<PostResponse> => {
    return await fetch(FETCH_METHOD.PUT, `${RESOURCE}/${id}/dislike`)
  }

  const reportPost = async (id: string): Promise<PostReportResponse> => {
    return await fetch(FETCH_METHOD.PUT, `${RESOURCE}/${id}/report`)
  }

  return {
    getPostList,
    getPost,
    createPost,
    likePost,
    dislikePost,
    reportPost,
  }
}
