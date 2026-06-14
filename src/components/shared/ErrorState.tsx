import { AlertTriangle, X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { RetryButton } from '~/components/shared/RetryButton'
import { cn } from '~/lib/utils'

interface ErrorStateProps {
  title: string
  description: string
  onRetry: () => void
  onClose?: () => void
  compact?: boolean
  className?: string
}

export function ErrorState({ title, description, onRetry, onClose, compact = false, className }: ErrorStateProps) {
  return (
    <Card className={cn('relative flex items-center justify-center', compact ? 'p-4' : 'p-5', className)}>
      <div className="flex w-full flex-col items-center text-center">
        <div className="rounded-lg border border-error/40 bg-error/10 p-2 text-error">
          <AlertTriangle className="size-4" aria-hidden="true" />
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-100">{title}</p>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
        <div className="mt-4 flex justify-center">
          <RetryButton onRetry={onRetry} />
        </div>
        {onClose ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 size-8 rounded-lg text-slate-500 hover:text-white"
            aria-label="Dismiss message"
            onClick={onClose}
          >
            <X className="size-4" aria-hidden="true" />
          </Button>
        ) : null}
      </div>
    </Card>
  )
}
