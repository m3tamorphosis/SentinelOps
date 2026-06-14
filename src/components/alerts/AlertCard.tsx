import { AlertCircle, Bell, GitPullRequestDraft } from 'lucide-react'
import { formatDateTime } from '~/lib/utils'
import type { OperationalAlert } from '~/types/inventory'

interface AlertCardProps {
  alert: OperationalAlert
}

export function AlertCard({ alert }: AlertCardProps) {
  const Icon = alert.severity === 'critical' ? AlertCircle : alert.severity === 'warning' ? GitPullRequestDraft : Bell
  const tone =
    alert.severity === 'critical'
      ? 'border-error/40 bg-error/10 text-red-300'
      : alert.severity === 'warning'
        ? 'border-warning/40 bg-warning/10 text-amber-300'
        : 'border-primary/40 bg-primary/10 text-blue-300'

  return (
    <article className="border-b border-border/80 p-3.5 transition-[background-color,transform] duration-200 ease-out last:border-0 hover:-translate-y-0.5 hover:bg-slate-900/50">
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 shrink-0 rounded-lg border p-2 ${tone}`}>
          <Icon className="size-4" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="min-w-0 text-sm font-bold leading-5 text-slate-100">{alert.title}</p>
            <span className="shrink-0 whitespace-nowrap text-xs text-slate-500">{formatDateTime(alert.createdAt)}</span>
          </div>
          <p className="mt-0.5 text-sm leading-5 text-slate-400">{alert.description}</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-normal text-slate-400">{alert.platform}</p>
        </div>
      </div>
    </article>
  )
}
