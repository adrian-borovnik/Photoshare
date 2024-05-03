import { createFetchClient } from '../config/api'
import { createApiModules } from '../lib/api'
import Cookies from 'js-cookie'

export const useApi = () => {
  const apiUrl = 'http://localhost:4000/api'

  const fetchClient = createFetchClient(apiUrl, {
    locale: 'en',
    cookie: Cookies.get('AUTH'),
  })

  return createApiModules(fetchClient)
}
