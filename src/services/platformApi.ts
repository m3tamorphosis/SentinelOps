import { createIsomorphicFn } from '@tanstack/react-start'
import type { ShopifyData, TikTokData } from '~/types/inventory'

type ApiErrorBody = {
  error?: string
}

export function fetchShopifyData() {
  return fetchJson<ShopifyData>('/shopify_data')
}

export function fetchTikTokData(mode?: 'success' | 'error') {
  const query = mode ? `?mode=${mode}` : ''

  return fetchJson<TikTokData>(`/tiktok_data${query}`)
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(await resolveApiUrl(path), {
    headers: {
      accept: 'application/json'
    },
    cache: 'no-store'
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as ApiErrorBody | null
    throw new Error(body?.error ?? `Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

const resolveApiUrl = createIsomorphicFn()
  .client((path: string) => path)
  .server(async (path: string) => {
    const { getRequest } = await import('@tanstack/react-start/server')

    return new URL(path, getRequest().url).toString()
  })
