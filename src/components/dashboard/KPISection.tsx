import { AlertTriangle, Boxes, CircleOff, RefreshCw } from 'lucide-react'
import { Suspense, use } from 'react'
import { AsyncErrorBoundary } from '~/components/shared/AsyncErrorBoundary'
import { KPICard } from '~/components/dashboard/KPICard'
import type { InventoryItem, TikTokData } from '~/types/inventory'
import { mergeInventory } from '~/services/mockApi'

interface KPISectionProps {
  shopifyInventory: Array<InventoryItem>
  tiktokPromise: Promise<TikTokData>
  resetKey: number
}

export function KPISection({ shopifyInventory, tiktokPromise, resetKey }: KPISectionProps) {
  const lowStock = shopifyInventory.filter((item) => item.shopifyStock <= item.reorderPoint).length
  const criticalStock = shopifyInventory.filter((item) => item.shopifyStock <= 10).length

  return (
    <section className="grid self-start grid-cols-1 items-start gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <KPICard icon={Boxes} label="Total SKUs" value={String(shopifyInventory.length)} trend="+4.2%" tone="primary" />
      <KPICard icon={AlertTriangle} label="Low Stock" value={String(lowStock)} trend="+2 today" tone="warning" />
      <KPICard icon={CircleOff} label="Critical Stock" value={String(criticalStock)} trend="+1 today" tone="error" />
      <AsyncErrorBoundary
        resetKey={resetKey}
        fallback={() => <KPICard icon={RefreshCw} label="Sync Issues" value="!" trend="Retry" tone="error" />}
      >
        <Suspense
          fallback={<KPICard icon={RefreshCw} label="Sync Issues" value="..." trend="TikTok pending" tone="primary" />}
        >
          <SyncIssuesCard shopifyInventory={shopifyInventory} tiktokPromise={tiktokPromise} />
        </Suspense>
      </AsyncErrorBoundary>
    </section>
  )
}

function SyncIssuesCard({
  shopifyInventory,
  tiktokPromise
}: {
  shopifyInventory: Array<InventoryItem>
  tiktokPromise: Promise<TikTokData>
}) {
  const tiktok = use(tiktokPromise)
  const merged = mergeInventory(shopifyInventory, tiktok)
  const issues = merged.filter((item) => item.syncStatus !== 'synced').length

  return (
    <KPICard
      icon={RefreshCw}
      label="Sync Issues"
      value={String(issues)}
      trend={issues > 0 ? `${issues} active` : 'Clear'}
      tone={issues > 0 ? 'warning' : 'success'}
    />
  )
}
