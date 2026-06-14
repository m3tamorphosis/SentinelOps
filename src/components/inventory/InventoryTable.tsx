import { ArrowDown, ArrowUp, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { SectionHeader } from '~/components/shared/SectionHeader'
import { StatusBadge } from '~/components/shared/StatusBadge'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { cn } from '~/lib/utils'
import type { InventoryItem } from '~/types/inventory'

type SortKey = 'product' | 'sku' | 'shopifyStock' | 'tiktokStock' | 'syncStatus' | 'risk'
type SortDirection = 'asc' | 'desc'

interface InventoryTableProps {
  inventory: Array<InventoryItem>
  loadingTikTok?: boolean
}

const columns: Array<{ key: SortKey; label: string; align?: 'right' }> = [
  { key: 'product', label: 'Product' },
  { key: 'sku', label: 'SKU' },
  { key: 'shopifyStock', label: 'Shopify Stock', align: 'right' },
  { key: 'tiktokStock', label: 'TikTok Stock', align: 'right' },
  { key: 'syncStatus', label: 'Sync Status' },
  { key: 'risk', label: 'Risk' }
]

const pageSize = 10

export function InventoryTable({ inventory, loadingTikTok = false }: InventoryTableProps) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [sort, setSort] = useState<{ key: SortKey; direction: SortDirection }>({
    key: 'risk',
    direction: 'desc'
  })

  const sortedInventory = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = normalizedQuery
      ? inventory.filter(
          (item) =>
            item.product.toLowerCase().includes(normalizedQuery) ||
            item.sku.toLowerCase().includes(normalizedQuery)
        )
      : inventory

    return [...filtered].sort((a, b) => compareItems(a, b, sort.key, sort.direction))
  }, [inventory, query, sort])

  const pageCount = Math.max(1, Math.ceil(sortedInventory.length / pageSize))
  const activePage = Math.min(page, pageCount - 1)
  const visibleInventory = sortedInventory.slice(activePage * pageSize, activePage * pageSize + pageSize)

  function handleSort(key: SortKey) {
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  return (
    <section className="space-y-4">
      <SectionHeader
        title="Inventory Table"
        description={loadingTikTok ? 'Shopify inventory is live. TikTok columns are pending.' : 'Cross-platform stock comparison'}
        action={
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(0)
              }}
              placeholder="Search product or SKU"
              className="pl-9"
            />
          </div>
        }
      />
      <div className="flex h-[815px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg shadow-black/20">
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <table className="w-full min-w-[720px] table-auto border-collapse text-sm xl:min-w-0 xl:table-fixed xl:text-[13px]">
            <colgroup>
              <col className="xl:w-[23%]" />
              <col className="xl:w-[19%]" />
              <col className="xl:w-[13%]" />
              <col className="xl:w-[13%]" />
              <col className="xl:w-[16%]" />
              <col className="xl:w-[16%]" />
            </colgroup>
            <thead className="bg-slate-950/70 text-xs uppercase text-slate-500">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className={cn('border-b border-border px-3 py-3 text-left font-medium', column.align === 'right' && 'text-right')}
                  >
                    <button
                      type="button"
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-md text-left hover:text-slate-200',
                        column.align === 'right' && 'justify-end text-right'
                      )}
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                      {sort.key === column.key ? (
                        sort.direction === 'asc' ? (
                          <ArrowUp className="size-3" aria-hidden="true" />
                        ) : (
                          <ArrowDown className="size-3" aria-hidden="true" />
                        )
                      ) : null}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleInventory.map((item) => (
                <tr key={item.id} className="border-b border-border/80 last:border-0 hover:bg-slate-900/40">
                  <td className="px-3 py-4">
                    <p className="truncate font-medium text-slate-100" title={item.product}>
                      {item.product}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Velocity {item.velocity}/day</p>
                  </td>
                  <td className="truncate px-3 py-4 font-mono text-xs text-slate-400" title={item.sku}>
                    {item.sku}
                  </td>
                  <td className="px-3 py-4 text-right font-medium text-slate-100">{item.shopifyStock}</td>
                  <td className="px-3 py-4 text-right font-medium text-slate-100">
                    {typeof item.tiktokStock === 'number' ? item.tiktokStock : <span className="text-slate-500">Pending</span>}
                  </td>
                  <td className="px-3 py-4">
                    <StatusBadge status={item.syncStatus} />
                  </td>
                  <td className="px-3 py-4">
                    <StatusBadge status={item.risk} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sortedInventory.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm font-medium text-slate-100">No inventory found</p>
            <p className="mt-1 text-sm text-slate-400">Try another product name or SKU.</p>
          </div>
        ) : null}
        {sortedInventory.length > pageSize ? (
          <div className="flex items-center justify-between gap-3 border-t border-border bg-slate-950/50 px-3 py-3">
            <p className="text-xs text-slate-500">
              Showing {activePage * pageSize + 1}-{Math.min((activePage + 1) * pageSize, sortedInventory.length)} of{' '}
              {sortedInventory.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setPage((current) => Math.max(0, current - 1))}
                disabled={activePage === 0}
              >
                Previous
              </Button>
              <span className="min-w-14 text-center text-xs text-slate-500">
                {activePage + 1} / {pageCount}
              </span>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
                disabled={activePage >= pageCount - 1}
              >
                Next
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function compareItems(a: InventoryItem, b: InventoryItem, key: SortKey, direction: SortDirection) {
  const modifier = direction === 'asc' ? 1 : -1

  if (key === 'risk') {
    return (riskRank(a.risk) - riskRank(b.risk)) * modifier
  }

  const aValue = a[key]
  const bValue = b[key]

  if (typeof aValue === 'number' || typeof bValue === 'number') {
    return (((aValue as number | undefined) ?? -1) - ((bValue as number | undefined) ?? -1)) * modifier
  }

  return String(aValue).localeCompare(String(bValue)) * modifier
}

function riskRank(risk: InventoryItem['risk']) {
  return {
    low: 0,
    medium: 1,
    high: 2,
    critical: 3
  }[risk]
}
