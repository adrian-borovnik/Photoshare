import { $fetch } from 'ofetch'
import type { FetchOptions, $Fetch, FetchError } from 'ofetch'
import { FETCH_METHOD } from '../lib/api/types'
import Cookies from 'js-cookie'

export const createFetchClient = (
  baseUrl: FetchOptions['baseURL'],
  options: {
    token?: string
    locale?: string
    cookie?: string
  }
) => {
  const fetchOptions: FetchOptions = {
    baseURL: baseUrl,
    credentials: 'include',
    headers: {
      // Authorization: options.token ? `Bearer ${options.token}` : '',
      Cookie: `AUTH=${Cookies.get('AUTH')}`,
      'Content-Type': 'application/json',
      'Accept-Language': options.locale || 'en',
    },
  }

  console.log('fetchOptions', fetchOptions)

  return $fetch.create(fetchOptions)
}

export const createFetch = (fetchClient: $Fetch) => {
  const fetch = <T>(
    method: FETCH_METHOD,
    url: string,
    data?: any,
    extras = {}
  ): Promise<T> => {
    console.log('fetch', method, url, data)
    return new Promise((resolve, reject) => {
      fetchClient(url, {
        method,
        body: data,
        onRequest({ options }) {
          // In case of file uploads, we need to remove the Content-Type header
          if (options.body instanceof FormData) {
            delete (options.headers as any)['Content-Type']
          }
        },
        ...extras,
      })
        .then((response) => {
          console.log('response', response)
          resolve(response)
        })
        .catch((error: FetchError) => {
          console.error('error', error)
          reject(error.data)
        })
    })
  }

  return fetch
}
