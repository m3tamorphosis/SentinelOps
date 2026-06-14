import { CheckCircle2, GitBranch, RadioTower, ShieldAlert } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionHeader } from '~/components/shared/SectionHeader'
import { Card } from '~/components/ui/card'
import type { ShopifyData } from '~/types/inventory'

interface SyncRunbookPanelProps {
  shopify: ShopifyData
}

export function SyncRunbookPanel({ shopify }: SyncRunbookPanelProps) {
  const criticalCount = shopify.inventory.filter((item) => item.shopifyStock <= 10).length
  const lowStockCount = shopify.inventory.filter((item) => item.shopifyStock <= item.reorderPoint).length

  return (
    <section className="space-y-3">
      <SectionHeader title="Sync Runbook" description="Automated recovery and operator actions" />
      <Card className="h-[405px] p-4">
        <div className="space-y-3">
          <RunbookItem
            icon={RadioTower}
            title="Webhook intake"
            detail={`${shopify.inventory.length} SKUs accepted from Shopify`}
            tone="success"
          />
          <RunbookItem
            icon={GitBranch}
            title="Diff resolver"
            detail="TikTok deltas are isolated from Shopify rendering"
            tone="primary"
          />
          <RunbookItem
            icon={ShieldAlert}
            title="Stock guardrail"
            detail={`${criticalCount} critical and ${lowStockCount} low-stock SKUs require review`}
            tone={criticalCount > 0 ? 'error' : 'warning'}
          />
          <RunbookItem
            icon={CheckCircle2}
            title="Rollback policy"
            detail="Shopify remains source of truth during TikTok failures"
            tone="success"
          />
        </div>
      </Card>
    </section>
  )
}

function RunbookItem({
  icon: Icon,
  title,
  detail,
  tone
}: {
  icon: LucideIcon
  title: string
  detail: string
  tone: 'primary' | 'success' | 'warning' | 'error'
}) {
  const toneClass = {
    primary: 'border-primary/40 bg-primary/10 text-blue-300',
    success: 'border-success/40 bg-success/10 text-green-300',
    warning: 'border-warning/40 bg-warning/10 text-amber-300',
    error: 'border-error/40 bg-error/10 text-red-300'
  }[tone]

  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-slate-950/60 p-3 transition-[border-color,background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-950/80 hover:shadow-lg hover:shadow-black/20">
      <div className={`rounded-lg border p-2 ${toneClass}`}>
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-100">{title}</p>
        <p className="mt-0.5 text-xs font-semibold leading-5 text-slate-300">{detail}</p>
      </div>
    </div>
  )
}
