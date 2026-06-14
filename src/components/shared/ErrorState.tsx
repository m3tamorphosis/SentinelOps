import { AlertTriangle } from 'lucide-react'
import { Card } from '~/components/ui/card'
import { RetryButton } from '~/components/shared/RetryButton'
import { cn } from '~/lib/utils'

interface ErrorStateProps {
  title: string
  description: string
  onRetry: () => void
  compact?: boolean
  className?: string
}

export function ErrorState({ title, description, onRetry, compact = false, className }: ErrorStateProps) {
  return (
    <Card className={cn(compact ? 'p-4' : 'p-5', className)}>
      <div className="flex items-start gap-3">
        <div className="rounded-lg border border-error/40 bg-error/10 p-2 text-error">
          <AlertTriangle className="size-4" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-100">{title}</p>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
          <div className="mt-4">
            <RetryButton onRetry={onRetry} />
          </div>
        </div>
      </div>
    </Card>
  )
}
