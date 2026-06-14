import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card } from '~/components/ui/card'
import { cn } from '~/lib/utils'
import type { KPI } from '~/types/inventory'

interface KPICardProps extends KPI {
  icon: LucideIcon
}

const toneClasses: Record<KPI['tone'], string> = {
  primary: 'border-primary/40 bg-primary/10 text-blue-300',
  success: 'border-success/40 bg-success/10 text-green-300',
  warning: 'border-warning/40 bg-warning/10 text-amber-300',
  error: 'border-error/40 bg-error/10 text-red-300'
}

export function KPICard({ label, value, trend, tone, icon: Icon }: KPICardProps) {
  const TrendIcon = tone === 'success' || tone === 'primary' ? ArrowUpRight : ArrowDownRight

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className={cn('rounded-xl border p-2.5', toneClasses[tone])}>
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className={cn('flex items-center gap-1 text-xs font-medium', toneClasses[tone], 'border-0 bg-transparent p-0')}>
          <TrendIcon className="size-3.5" aria-hidden="true" />
          {trend}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-semibold tracking-normal text-white">{value}</p>
        <p className="mt-1 text-sm text-slate-400">{label}</p>
      </div>
    </Card>
  )
}
