import { Config } from '@/config'
import {
  BeatsaverAlert,
  BeatsaverAlertStats,
  BSMap,
  BSMapLatestResponse,
  BSUserResponse,
  HashReqResponse,
} from '../interfaces/beatsaver'

export interface OAuthTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope?: string
}
export interface OAuthTokenInfoResponse {
  scope?: string[]
  id: string
  name: string
}

const get = <T>(...args) => fetch(args as any).then((res) => res.json() as T)
export const bsRequest = (cfg: Config) => {
  let host = cfg.beatSaverHost ?? 'https://api.beatsaver.com'
  if (host.endsWith('/')) {
    host = host.substring(0, host.length - 1)
  }

  const url = (path: string) => {
    if (!path.startsWith('/')) {
      path = '/' + path
    }
    return host + path
  }

  const getBSMapperById = async (userId: string) =>
    get<BSUserResponse>(url(`/users/id/${userId}`))

  const getLatestMaps = async (pageSize: number = 5) =>
    get<BSMapLatestResponse>(
      url(`/maps/latest?sort=FIRST_PUBLISHED&pageSize=${pageSize}`)
    ).then((res) => res.docs)

  const searchMapByKeyword = async (key: string) =>
    get<BSMapLatestResponse>(url(`/search/text/0?q=${key}`)).then(
      (res) => res.docs
    )

  const searchMapById = async (id: string) => get<BSMap>(url(`/maps/id/${id}`))

  const getAlertsStats = async (accessToken: string) =>
    get<BeatsaverAlertStats>(url(`/alerts/stats`), {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

  const getAlertsByPage = async (
    accessToken: string,
    type: 'unread' | 'read',
    page: number
  ) =>
    get<BeatsaverAlert[]>(url(`/alerts/${type}/${page}`), {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

  const getUnreadAlertsByPage = (accessToken: string, page: number) =>
    getAlertsByPage(accessToken, 'unread', page)

  const getReadAlertsByPage = (accessToken: string, page: number) =>
    getAlertsByPage(accessToken, 'read', page)

  const refreshOAuthToken = async (refreshToken: string) => {
    const form = new FormData()
    form.append('client_id', cfg.bsOauthClientId)
    form.append('client_secret', cfg.bsOauthClientSecret)
    form.append('grant_type', 'refresh_token')
    form.append('refresh_token', refreshToken)
    const res = await fetch('https://beatsaver.com/api/oauth2/token', {
      method: 'POST',
      body: form,
    }).then((res) => res.json() as Promise<OAuthTokenResponse>)
    if (!res.access_token) {
      throw new Error('refreshToken failed')
    }
    return res
  }

  //
  const getTokenInfo = async (accessToken: string) => {
    return get<OAuthTokenInfoResponse>(url(`/oauth2/identity`), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  const getMapsByHashes = async (hashes: string[]) =>
    get<HashReqResponse>(url(`/maps/hash/${hashes.join(',')}`))

  return {
    refreshOAuthToken,
    getBSMapperById,
    getLatestMaps,
    searchMapByKeyword,
    searchMapById,
    getUnreadAlertsByPage,
    getTokenInfo,
    getMapsByHashes,
  }
}