import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage } from '~/components/dashboard/DashboardPage'
import { fetchShopifyData, fetchTikTokData } from '~/services/platformApi'

export const Route = createFileRoute('/')({
  loader: async () => {
    const tiktokPromise = fetchTikTokData()
    const shopify = await fetchShopifyData()

    return {
      shopify,
      tiktokPromise,
      lastUpdated: new Date().toISOString()
    }
  },
  component: DashboardRoute
})

function DashboardRoute() {
  const { shopify, tiktokPromise, lastUpdated } = Route.useLoaderData()

  return (
    <DashboardPage
      key={lastUpdated}
      shopify={shopify}
      tiktokPromise={tiktokPromise}
      lastUpdated={lastUpdated}
    />
  )
}
