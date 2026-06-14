import { useRouter } from '@tanstack/react-router'
import { Suspense, use, useCallback, useEffect, useRef, useState } from 'react'
import { AlertsPanel } from '~/components/alerts/AlertsPanel'
import { AlertIntelligencePanel } from '~/components/alerts/AlertIntelligencePanel'
import { KPISection } from '~/components/dashboard/KPISection'
import { InventoryTable } from '~/components/inventory/InventoryTable'
import { AppHeader } from '~/components/layout/AppHeader'
import { PlatformHealthSection } from '~/components/platform/PlatformHealthSection'
import { SyncRunbookPanel } from '~/components/platform/SyncRunbookPanel'
import { AsyncErrorBoundary } from '~/components/shared/AsyncErrorBoundary'
import { ErrorState } from '~/components/shared/ErrorState'
import { mergeInventory } from '~/services/mockApi'
import { fetchTikTokData } from '~/services/platformApi'
import type { ShopifyData, TikTokData } from '~/types/inventory'

interface DashboardPageProps {
  shopify: ShopifyData
  tiktokPromise: Promise<TikTokData>
  lastUpdated: string
}

export function DashboardPage({ shopify, tiktokPromise: initialTikTokPromise, lastUpdated }: DashboardPageProps) {
  const router = useRouter()
  const refreshInFlight = useRef(false)
  const syncedLoaderData = useRef(false)
  const [resetKey, setResetKey] = useState(0)
  const [tiktokPromise, setTikTokPromise] = useState<Promise<TikTokData>>(initialTikTokPromise)
  const [autoRefreshSeconds, setAutoRefreshSeconds] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (!syncedLoaderData.current) {
      syncedLoaderData.current = true
      return
    }

    setResetKey((key) => key + 1)
    setTikTokPromise(initialTikTokPromise)
  }, [initialTikTokPromise])

  const refreshDashboard = useCallback(async () => {
    if (refreshInFlight.current) {
      return
    }

    refreshInFlight.current = true
    setIsRefreshing(true)
    setResetKey((key) => key + 1)

    try {
      await router.invalidate()
    } finally {
      refreshInFlight.current = false
      setIsRefreshing(false)
    }
  }, [router])

  useEffect(() => {
    if (autoRefreshSeconds === 0) {
      return
    }

    const intervalId = window.setInterval(() => {
      void refreshDashboard()
    }, autoRefreshSeconds * 1000)

    return () => window.clearInterval(intervalId)
  }, [autoRefreshSeconds, refreshDashboard])

  function retryTikTok() {
    setResetKey((key) => key + 1)
    setTikTokPromise(fetchTikTokData())
  }

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <AppHeader
        lastUpdated={lastUpdated}
        tiktokPromise={tiktokPromise}
        resetKey={resetKey}
        onRefresh={refreshDashboard}
        isRefreshing={isRefreshing}
        autoRefreshSeconds={autoRefreshSeconds}
        onAutoRefreshSecondsChange={setAutoRefreshSeconds}
      />
      <main className="mx-auto grid max-w-[1640px] grid-cols-1 gap-5 px-4 py-4 sm:px-5 lg:px-6 xl:grid-cols-[minmax(0,1fr)_340px_360px] xl:items-start 2xl:grid-cols-[minmax(0,1fr)_380px_400px]">
        <div className="space-y-5 xl:min-w-0">
          <KPISection shopifyInventory={shopify.inventory} tiktokPromise={tiktokPromise} resetKey={resetKey} />
          <AsyncErrorBoundary
            resetKey={resetKey}
            fallback={() => (
              <div className="space-y-4">
                <InventoryTable inventory={mergeInventory(shopify.inventory)} loadingTikTok />
                <ErrorState
                  compact
                  title="Unable to load TikTok inventory"
                  description="The table is using Shopify stock until TikTok responds."
                  onRetry={retryTikTok}
                />
              </div>
            )}
          >
            <Suspense fallback={<InventoryTable inventory={mergeInventory(shopify.inventory)} loadingTikTok />}>
              <InventoryTableWithTikTok shopify={shopify} tiktokPromise={tiktokPromise} />
            </Suspense>
          </AsyncErrorBoundary>
        </div>
        <div className="space-y-5 xl:min-w-0">
          <PlatformHealthSection
            shopify={shopify}
            tiktokPromise={tiktokPromise}
            resetKey={resetKey}
            onRetry={retryTikTok}
          />
          <SyncRunbookPanel shopify={shopify} />
        </div>
        <div className="space-y-5 xl:min-w-0">
          <AlertsPanel
            shopifyInventory={shopify.inventory}
            tiktokPromise={tiktokPromise}
            resetKey={resetKey}
            onRetry={retryTikTok}
          />
          <AlertIntelligencePanel
            shopifyInventory={shopify.inventory}
            tiktokPromise={tiktokPromise}
            resetKey={resetKey}
            onRetry={retryTikTok}
          />
        </div>
      </main>
    </div>
  )
}

function InventoryTableWithTikTok({
  shopify,
  tiktokPromise
}: {
  shopify: ShopifyData
  tiktokPromise: Promise<TikTokData>
}) {
  const tiktok = use(tiktokPromise)

  return <InventoryTable inventory={mergeInventory(shopify.inventory, tiktok)} />
}
