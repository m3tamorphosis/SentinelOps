import { ChevronDown, RefreshCw, ShieldCheck, TimerReset } from 'lucide-react'
import { Suspense, use, useState } from 'react'
import { AsyncErrorBoundary } from '~/components/shared/AsyncErrorBoundary'
import { StatusBadge } from '~/components/shared/StatusBadge'
import { Button } from '~/components/ui/button'
import { formatDateTime } from '~/lib/utils'
import type { TikTokData } from '~/types/inventory'

interface AppHeaderProps {
  lastUpdated: string
  tiktokPromise: Promise<TikTokData>
  resetKey: number
  onRefresh: () => void | Promise<void>
  isRefreshing: boolean
  autoRefreshSeconds: number
  onAutoRefreshSecondsChange: (seconds: number) => void
}

export function AppHeader({
  lastUpdated,
  tiktokPromise,
  resetKey,
  onRefresh,
  isRefreshing,
  autoRefreshSeconds,
  onAutoRefreshSecondsChange
}: AppHeaderProps) {
  const autoRefreshEnabled = autoRefreshSeconds > 0

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
            <div
              className={
                autoRefreshEnabled
                  ? 'relative inline-flex h-10 items-center gap-2 rounded-xl border border-primary/60 bg-primary/15 px-3 text-sm font-medium text-white shadow-sm shadow-primary/20'
                  : 'relative inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-sm font-medium text-slate-100'
              }
            >
              <TimerReset className="size-4" aria-hidden="true" />
              <span>Auto</span>
              <AutoRefreshMenu value={autoRefreshSeconds} onChange={onAutoRefreshSecondsChange} menuClassName="left-0 right-0 w-full" />
            </div>
            <Button type="button" variant="secondary" onClick={onRefresh} disabled={isRefreshing}>
              <RefreshCw className={isRefreshing ? 'size-4 animate-spin' : 'size-4'} aria-hidden="true" />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

function AutoRefreshMenu({
  value,
  onChange,
  menuClassName
}: {
  value: number
  onChange: (seconds: number) => void
  menuClassName?: string
}) {
  const [open, setOpen] = useState(false)
  const options = [
    { value: 0, label: 'Off' },
    { value: 15, label: '15s' },
    { value: 30, label: '30s' },
    { value: 60, label: '60s' }
  ]
  const selected = options.find((option) => option.value === value) ?? options[0]

  return (
    <span
      className="contents"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false)
        }
      }}
    >
      <button
        type="button"
        className="inline-flex h-7 w-14 items-center justify-between gap-1 rounded-md px-1 text-xs font-semibold text-white outline-none hover:text-blue-200 focus-visible:ring-2 focus-visible:ring-primary/60"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {selected.label}
        <ChevronDown className="size-3.5 text-slate-400" aria-hidden="true" />
      </button>
      {open ? (
        <div
          className={`absolute top-11 z-50 overflow-hidden rounded-lg border border-border bg-slate-950 py-1 shadow-xl shadow-black/40 ${menuClassName ?? 'right-0 w-14'}`}
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={
                option.value === value
                  ? 'block w-full bg-primary/20 px-3 py-2 text-left text-xs font-semibold text-blue-200'
                  : 'block w-full px-3 py-2 text-left text-xs font-medium text-slate-300 hover:bg-slate-900 hover:text-white'
              }
              role="option"
              aria-selected={option.value === value}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </span>
  )
}

function TikTokHeaderStatus({ tiktokPromise }: { tiktokPromise: Promise<TikTokData> }) {
  const tiktok = use(tiktokPromise)

  return <StatusBadge status={tiktok.status} />
}
