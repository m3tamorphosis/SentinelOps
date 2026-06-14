import { Clock, Gauge, RotateCcw } from 'lucide-react'
import { StatusBadge } from '~/components/shared/StatusBadge'
import { RetryButton } from '~/components/shared/RetryButton'
import { Card } from '~/components/ui/card'
import { cn, formatDateTime, formatRelativeMinutes } from '~/lib/utils'
import type { PlatformHealth } from '~/types/inventory'

interface PlatformHealthCardProps {
  health: PlatformHealth
  onRetry?: () => void
  className?: string
}

export function PlatformHealthCard({ health, onRetry, className }: PlatformHealthCardProps) {
  const name = health.platform === 'shopify' ? 'Shopify' : 'TikTok'

  return (
    <Card className={cn('p-5', className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-100">{name}</p>
          <p className="mt-1 text-xs text-slate-400">
            Last sync {formatDateTime(health.lastSync)}
          </p>
        </div>
        <StatusBadge status={health.status} />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-3 text-sm">
        <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-slate-950/60 px-3 py-2.5">
          <span className="inline-flex items-center gap-2 text-slate-400">
            <Gauge className="size-4" aria-hidden="true" />
            Response Time
          </span>
          <span className="font-medium text-slate-100">{health.responseTimeMs}ms</span>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-slate-950/60 px-3 py-2.5">
          <span className="inline-flex items-center gap-2 text-slate-400">
            <Clock className="size-4" aria-hidden="true" />
            Last Success
          </span>
          <span className="font-medium text-slate-100">{formatDateTime(health.lastSuccessfulSync)}</span>
        </div>
        {health.delayMinutes > 0 ? (
          <div className="flex items-center justify-between gap-4 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2.5">
            <span className="inline-flex items-center gap-2 text-amber-300">
              <RotateCcw className="size-4" aria-hidden="true" />
              Delay
            </span>
            <span className="font-medium text-amber-200">{formatRelativeMinutes(health.delayMinutes)}</span>
          </div>
        ) : null}
      </div>
      {health.retryable && onRetry ? (
        <div className="mt-4">
          <RetryButton onRetry={onRetry} />
        </div>
      ) : null}
    </Card>
  )
}
