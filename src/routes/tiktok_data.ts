import { createFileRoute } from '@tanstack/react-router'
import { getTikTokData } from '~/services/mockApi'
import { errorResponse, jsonResponse } from '~/server/http'

export const Route = createFileRoute('/tiktok_data')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url)
          const mode = url.searchParams.get('mode')

          return jsonResponse(await getTikTokData(mode === 'success' || mode === 'error' ? mode : undefined))
        } catch (error) {
          return errorResponse(error instanceof Error ? error.message : 'TikTok request failed')
        }
      }
    }
  }
})
