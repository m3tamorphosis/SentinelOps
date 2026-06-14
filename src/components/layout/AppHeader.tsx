import { RefreshCw, ShieldCheck } from 'lucide-react'
import { Suspense, use } from 'react'
import { AsyncErrorBoundary } from '~/components/shared/AsyncErrorBoundary'
import { StatusBadge } from '~/components/shared/StatusBadge'
import { Button } from '~/components/ui/button'
import { formatDateTime } from '~/lib/utils'
import type { TikTokData } from '~/types/inventory'

interface AppHeaderProps {
  lastUpdated: string
  tiktokPromise: Promise<TikTokData>
  resetKey: number
  onRefresh: () => void
}

export function AppHeader({ lastUpdated, tiktokPromise, resetKey, onRefresh }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-blue-300">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-normal text-white">SentinelOps</h1>
            <p className="text-sm text-slate-400">Inventory Intelligence & Platform Health Command Center</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between xl:justify-end">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status="healthy" />
            <AsyncErrorBoundary resetKey={resetKey} fallback={() => <StatusBadge status="failed" />}>
              <Suspense fallback={<StatusBadge status="loading" />}>
                <TikTokHeaderStatus tiktokPromise={tiktokPromise} />
              </Suspense>
            </AsyncErrorBoundary>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs text-slate-500">Last updated {formatDateTime(lastUpdated)}</p>
            <Button type="button" variant="secondary" onClick={onRefresh}>
              <RefreshCw className="size-4" aria-hidden="true" />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

function TikTokHeaderStatus({ tiktokPromise }: { tiktokPromise: Promise<TikTokData> }) {
  const tiktok = use(tiktokPromise)

  return <StatusBadge status={tiktok.status} />
}
