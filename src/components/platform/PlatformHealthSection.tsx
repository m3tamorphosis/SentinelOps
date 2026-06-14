import { Suspense, use } from 'react'
import { ErrorState } from '~/components/shared/ErrorState'
import { AsyncErrorBoundary } from '~/components/shared/AsyncErrorBoundary'
import { SectionHeader } from '~/components/shared/SectionHeader'
import { PlatformHealthCard } from '~/components/platform/PlatformHealthCard'
import { Card } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { buildShopifyHealth, buildTikTokHealth } from '~/services/mockApi'
import type { ShopifyData, TikTokData } from '~/types/inventory'

interface PlatformHealthSectionProps {
  shopify: ShopifyData
  tiktokPromise: Promise<TikTokData>
  resetKey: number
  onRetry: () => void
}

export function PlatformHealthSection({ shopify, tiktokPromise, resetKey, onRetry }: PlatformHealthSectionProps) {
  return (
    <section className="space-y-3">
      <SectionHeader title="Platform Health" description="Response, sync, and recovery state" />
      <div className="grid grid-cols-1 gap-3">
        <PlatformHealthCard health={buildShopifyHealth(shopify)} />
        <div className="h-[288px]">
          <AsyncErrorBoundary
            resetKey={resetKey}
            fallback={() => (
              <ErrorState
                compact
                className="h-full"
                title="Unable to load TikTok inventory"
                description="Shopify remains available while TikTok recovers."
                onRetry={onRetry}
              />
            )}
          >
            <Suspense fallback={<TikTokHealthSkeleton />}>
              <TikTokHealthCard tiktokPromise={tiktokPromise} onRetry={onRetry} />
            </Suspense>
          </AsyncErrorBoundary>
        </div>
      </div>
    </section>
  )
}

function TikTokHealthCard({
  tiktokPromise,
  onRetry
}: {
  tiktokPromise: Promise<TikTokData>
  onRetry: () => void
}) {
  const tiktok = use(tiktokPromise)

  return <PlatformHealthCard className="h-full" health={buildTikTokHealth(tiktok)} onRetry={onRetry} />
}

function TikTokHealthSkeleton() {
  return (
    <Card className="h-full p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Skeleton className="h-4 w-14" />
          <Skeleton className="mt-2 h-3 w-36" />
        </div>
        <Skeleton className="h-7 w-20 rounded-full" />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-3 text-sm">
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
      </div>
      <Skeleton className="mt-4 h-8 w-20 rounded-lg" />
    </Card>
  )
}
