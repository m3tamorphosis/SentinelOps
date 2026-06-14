import { Loader2 } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import type { PlatformStatus, RiskLevel, SyncStatus } from '~/types/inventory'

interface StatusBadgeProps {
  status: PlatformStatus | SyncStatus | RiskLevel
}

const labels: Record<PlatformStatus | SyncStatus | RiskLevel, string> = {
  healthy: 'Healthy',
  loading: 'Loading',
  delayed: 'Delayed',
  failed: 'Failed',
  synced: 'Synced',
  out_of_sync: 'Out of Sync',
  critical: 'Critical',
  pending: 'Pending',
  low: 'Low',
  medium: 'Medium',
  high: 'High'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variant =
    status === 'healthy' || status === 'synced' || status === 'low'
      ? 'success'
      : status === 'loading' || status === 'pending'
        ? 'muted'
        : status === 'failed' || status === 'critical' || status === 'high'
          ? 'error'
          : 'warning'

  return (
    <Badge variant={variant}>
      {status === 'loading' ? <Loader2 className="size-3 animate-spin" aria-hidden="true" /> : null}
      <span
        className={
          status === 'loading'
            ? 'size-1.5 rounded-full bg-slate-400'
            : status === 'healthy' || status === 'synced' || status === 'low'
              ? 'size-1.5 rounded-full bg-success'
              : status === 'failed' || status === 'critical' || status === 'high'
                ? 'size-1.5 rounded-full bg-error'
                : 'size-1.5 rounded-full bg-warning'
        }
      />
      {labels[status]}
    </Badge>
  )
}
