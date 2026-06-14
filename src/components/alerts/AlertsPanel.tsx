import { Suspense, use } from 'react'
import { AlertCard } from '~/components/alerts/AlertCard'
import { AsyncErrorBoundary } from '~/components/shared/AsyncErrorBoundary'
import { ErrorState } from '~/components/shared/ErrorState'
import { SectionHeader } from '~/components/shared/SectionHeader'
import { Card } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { buildAlerts, mergeInventory } from '~/services/mockApi'
import type { InventoryItem, TikTokData } from '~/types/inventory'

interface AlertsPanelProps {
  shopifyInventory: Array<InventoryItem>
  tiktokPromise: Promise<TikTokData>
  resetKey: number
  onRetry: () => void
}

export function AlertsPanel({ shopifyInventory, tiktokPromise, resetKey, onRetry }: AlertsPanelProps) {
  const loadingAlerts = buildAlerts(mergeInventory(shopifyInventory))

  return (
    <section className="space-y-3">
      <SectionHeader title="Alerts Feed" description="Inventory and sync events" />
      <AsyncErrorBoundary
        resetKey={resetKey}
        fallback={() => (
          <ErrorState
            compact
            className="h-[486px]"
            title="Unable to load TikTok inventory"
            description="Shopify alerts are still visible."
            onRetry={onRetry}
          />
        )}
      >
        <Suspense fallback={<AlertList alerts={loadingAlerts} loading />}>
          <TikTokAlertList shopifyInventory={shopifyInventory} tiktokPromise={tiktokPromise} />
        </Suspense>
      </AsyncErrorBoundary>
    </section>
  )
}

function TikTokAlertList({
  shopifyInventory,
  tiktokPromise
}: {
  shopifyInventory: Array<InventoryItem>
  tiktokPromise: Promise<TikTokData>
}) {
  const tiktok = use(tiktokPromise)
  const inventory = mergeInventory(shopifyInventory, tiktok)

  return <AlertList alerts={buildAlerts(inventory, tiktok)} />
}

function AlertList({ alerts, loading = false }: { alerts: ReturnType<typeof buildAlerts>; loading?: boolean }) {
  if (alerts.length === 0) {
    return (
      <Card className="flex h-[486px] flex-col items-center justify-center p-8 text-center">
        <p className="text-sm font-medium text-slate-100">No active alerts</p>
        <p className="mt-1 text-sm text-slate-400">Operational queues are clear.</p>
      </Card>
    )
  }

  return (
    <Card className="flex h-[500px] flex-col overflow-hidden">
      {loading ? (
        <div className="shrink-0 border-b border-border/80 p-3">
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      ) : null}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </Card>
  )
}
