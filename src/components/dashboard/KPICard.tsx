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
    <Card className="flex h-[136px] flex-col justify-between p-4">
      <div className="flex h-10 items-center justify-between gap-3">
        <div className={cn('flex size-10 items-center justify-center rounded-xl border', toneClasses[tone])}>
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className={cn('flex h-10 items-center gap-1 text-xs font-bold', toneClasses[tone], 'border-0 bg-transparent p-0')}>
          <TrendIcon className="size-3.5" aria-hidden="true" />
          {trend}
        </div>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold tracking-normal text-white">{value}</p>
        <p className="mt-1 text-sm font-semibold text-slate-300">{label}</p>
      </div>
    </Card>
  )
}
