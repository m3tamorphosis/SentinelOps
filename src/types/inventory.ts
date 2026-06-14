export type PlatformName = 'shopify' | 'tiktok'

export type PlatformStatus = 'healthy' | 'loading' | 'delayed' | 'failed'

export type SyncStatus = 'synced' | 'delayed' | 'out_of_sync' | 'critical' | 'pending'

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface InventoryItem {
  id: string
  product: string
  sku: string
  shopifyStock: number
  tiktokStock?: number
  reorderPoint: number
  velocity: number
  syncStatus: SyncStatus
  risk: RiskLevel
}

export interface PlatformHealth {
  platform: PlatformName
  status: PlatformStatus
  responseTimeMs: number
  lastSync: string
  lastSuccessfulSync: string
  delayMinutes: number
  retryable: boolean
}

export interface ShopifyData {
  status: 'healthy'
  responseTimeMs: number
  lastSync: string
  inventory: Array<InventoryItem>
}

export interface TikTokData {
  status: Exclude<PlatformStatus, 'loading'>
  responseTimeMs: number
  lastSync: string
  lastSuccessfulSync: string
  delayMinutes: number
  inventory: Array<Pick<InventoryItem, 'id' | 'sku'> & { tiktokStock: number }>
}

export type AlertSeverity = 'info' | 'warning' | 'critical'

export interface OperationalAlert {
  id: string
  title: string
  description: string
  severity: AlertSeverity
  platform: PlatformName | 'sync'
  createdAt: string
}

export interface KPI {
  label: string
  value: string
  trend: string
  tone: 'primary' | 'success' | 'warning' | 'error'
}
