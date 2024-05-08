import { $Fetch } from 'ofetch'
import { createFetch } from '../../../config/api'
import { API_RESOURCE, FETCH_METHOD } from '../types'
import { PostCommentCreateRequest } from './types'
import { PostComment } from '../../models/comment'

export const commentApi = (fetcher: $Fetch) => {
  const RESOURCE = API_RESOURCE.COMMENT
  const fetch = createFetch(fetcher)

  const listCommentsByPost = async (postId: string): Promise<PostComment[]> => {
    return await fetch(FETCH_METHOD.GET, `${RESOURCE}/post/${postId}`)
  }

  const createComment = async (
    requestParams: PostCommentCreateRequest
  ): Promise<PostComment> => {
    return await fetch(FETCH_METHOD.POST, `${RESOURCE}`, requestParams)
  }

  return {
    createComment,
    listCommentsByPost,
  }
}
