import { createFileRoute } from '@tanstack/react-router'
import { getShopifyData } from '~/services/mockApi'
import { errorResponse, jsonResponse } from '~/server/http'

export const Route = createFileRoute('/shopify_data')({
  server: {
    handlers: {
      GET: async () => {
        try {
          return jsonResponse(await getShopifyData())
        } catch (error) {
          return errorResponse(error instanceof Error ? error.message : 'Shopify request failed')
        }
      }
    }
  }
})
