import { Activity, Boxes, ShieldAlert, TriangleAlert } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Suspense, use } from 'react'
import { AsyncErrorBoundary } from '~/components/shared/AsyncErrorBoundary'
import { RetryButton } from '~/components/shared/RetryButton'
import { SectionHeader } from '~/components/shared/SectionHeader'
import { Card } from '~/components/ui/card'
import { buildAlerts, mergeInventory } from '~/services/mockApi'
import type { InventoryItem, TikTokData } from '~/types/inventory'

interface AlertIntelligencePanelProps {
  shopifyInventory: Array<InventoryItem>
  tiktokPromise: Promise<TikTokData>
  resetKey: number
  onRetry: () => void
}

export function AlertIntelligencePanel({
  shopifyInventory,
  tiktokPromise,
  resetKey,
  onRetry
}: AlertIntelligencePanelProps) {
  return (
    <section className="space-y-3">
      <SectionHeader title="Alert Intelligence" description="Severity mix and immediate impact" />
      <AsyncErrorBoundary
        resetKey={resetKey}
        fallback={() => <AlertInsightCard inventory={mergeInventory(shopifyInventory)} onRetry={onRetry} degraded />}
      >
        <Suspense fallback={<AlertInsightCard inventory={mergeInventory(shopifyInventory)} onRetry={onRetry} loading />}>
          <ResolvedAlertInsight shopifyInventory={shopifyInventory} tiktokPromise={tiktokPromise} onRetry={onRetry} />
        </Suspense>
      </AsyncErrorBoundary>
    </section>
  )
}

function ResolvedAlertInsight({
  shopifyInventory,
  tiktokPromise,
  onRetry
}: {
  shopifyInventory: Array<InventoryItem>
  tiktokPromise: Promise<TikTokData>
  onRetry: () => void
}) {
  const tiktok = use(tiktokPromise)

  return <AlertInsightCard inventory={mergeInventory(shopifyInventory, tiktok)} tiktok={tiktok} onRetry={onRetry} />
}

function AlertInsightCard({
  inventory,
  tiktok,
  onRetry,
  loading = false,
  degraded = false
}: {
  inventory: Array<InventoryItem>
  tiktok?: TikTokData
  onRetry: () => void
  loading?: boolean
  degraded?: boolean
}) {
  const alerts = buildAlerts(inventory, tiktok)
  const critical = alerts.filter((alert) => alert.severity === 'critical').length
  const warning = alerts.filter((alert) => alert.severity === 'warning').length
  const mismatch = inventory.filter((item) => item.syncStatus === 'out_of_sync' || item.syncStatus === 'critical').length
  const topRisk = [...inventory].sort((a, b) => riskRank(b.risk) - riskRank(a.risk))[0]
  const total = Math.max(alerts.length, 1)

  return (
    <Card className="h-[405px] p-4">
      <div className="grid grid-cols-3 gap-2">
        <InsightMetric icon={ShieldAlert} label="Critical" value={critical} tone="error" />
        <InsightMetric icon={TriangleAlert} label="Warning" value={warning} tone="warning" />
        <InsightMetric icon={Activity} label="Mismatch" value={mismatch} tone="primary" />
      </div>
      <div className="mt-4 overflow-hidden rounded-full border border-border bg-slate-950">
        <div className="flex h-2">
          <div className="bg-error" style={{ width: `${(critical / total) * 100}%` }} />
          <div className="bg-warning" style={{ width: `${(warning / total) * 100}%` }} />
          <div className="bg-primary" style={{ width: `${Math.max(0, ((total - critical - warning) / total) * 100)}%` }} />
        </div>
      </div>
      <div className="mt-4 rounded-lg border border-border bg-slate-950/60 p-3 transition-[border-color,background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-950/80 hover:shadow-lg hover:shadow-black/20">
        <div className="flex items-start gap-3">
          <div className="rounded-lg border border-primary/40 bg-primary/10 p-2 text-blue-300">
            <Boxes className="size-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-100">Highest exposure</p>
            <p className="mt-0.5 truncate text-sm text-slate-400" title={topRisk?.product}>
              {topRisk ? `${topRisk.product} · ${topRisk.shopifyStock} units` : 'No inventory risk detected'}
            </p>
          </div>
        </div>
      </div>
      {loading || degraded ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-border bg-slate-950/60 p-3 transition-[border-color,background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-950/80 hover:shadow-lg hover:shadow-black/20">
          <p className="text-xs text-slate-400">
            {degraded ? 'TikTok insight unavailable. Shopify-only summary shown.' : 'TikTok insight loading.'}
          </p>
          {degraded ? <RetryButton onRetry={onRetry} /> : null}
        </div>
      ) : null}
    </Card>
  )
}

function InsightMetric({
  icon: Icon,
  label,
  value,
  tone
}: {
  icon: LucideIcon
  label: string
  value: number
  tone: 'primary' | 'warning' | 'error'
}) {
  const toneClass = {
    primary: 'border-primary/40 bg-primary/10 text-blue-300',
    warning: 'border-warning/40 bg-warning/10 text-amber-300',
    error: 'border-error/40 bg-error/10 text-red-300'
  }[tone]

  return (
    <div className="flex h-[100px] flex-col justify-between rounded-lg border border-border bg-slate-950/60 p-3 transition-[border-color,background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-950/80 hover:shadow-lg hover:shadow-black/20">
      <div className={`flex size-7 items-center justify-center rounded-lg border ${toneClass}`}>
        <Icon className="size-3.5" aria-hidden="true" />
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-white">{value}</p>
        <p className="mt-0.5 text-xs font-semibold text-slate-400">{label}</p>
      </div>
    </div>
  )
}

function riskRank(risk: InventoryItem['risk']) {
  return {
    low: 0,
    medium: 1,
    high: 2,
    critical: 3
  }[risk]
}
