import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage } from '~/components/dashboard/DashboardPage'
import { getShopifyData, getTikTokData } from '~/services/mockApi'

export const Route = createFileRoute('/')({
  loader: async () => {
    const tiktokPromise = getTikTokData()
    const shopify = await getShopifyData()

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
