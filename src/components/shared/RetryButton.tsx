import { RotateCcw } from 'lucide-react'
import { Button } from '~/components/ui/button'

interface RetryButtonProps {
  onRetry: () => void
}

export function RetryButton({ onRetry }: RetryButtonProps) {
  return (
    <Button type="button" size="sm" variant="secondary" onClick={onRetry}>
      <RotateCcw className="size-3.5" aria-hidden="true" />
      Retry
    </Button>
  )
}
