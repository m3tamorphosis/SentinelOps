import type {
  InventoryItem,
  OperationalAlert,
  PlatformHealth,
  ShopifyData,
  SyncStatus,
  TikTokData
} from '~/types/inventory'

const shopifyInventory: Array<InventoryItem> = [
  {
    id: 'sku-1001',
    product: 'Apex Utility Jacket',
    sku: 'APX-JKT-BLK-M',
    shopifyStock: 124,
    reorderPoint: 40,
    velocity: 18,
    syncStatus: 'pending',
    risk: 'low'
  },
  {
    id: 'sku-1002',
    product: 'Northline Tech Pack',
    sku: 'NRD-PCK-GRY-18',
    shopifyStock: 19,
    reorderPoint: 30,
    velocity: 13,
    syncStatus: 'pending',
    risk: 'high'
  },
  {
    id: 'sku-1003',
    product: 'CoreFlex Training Tee',
    sku: 'CRF-TEE-WHT-L',
    shopifyStock: 211,
    reorderPoint: 60,
    velocity: 32,
    syncStatus: 'pending',
    risk: 'low'
  },
  {
    id: 'sku-1004',
    product: 'Signal Trail Sneaker',
    sku: 'SIG-SNK-OLV-10',
    shopifyStock: 8,
    reorderPoint: 24,
    velocity: 9,
    syncStatus: 'pending',
    risk: 'critical'
  },
  {
    id: 'sku-1005',
    product: 'Vault Thermal Bottle',
    sku: 'VLT-BTL-STL-32',
    shopifyStock: 57,
    reorderPoint: 35,
    velocity: 11,
    syncStatus: 'pending',
    risk: 'medium'
  },
  {
    id: 'sku-1006',
    product: 'Harbor Shell Hoodie',
    sku: 'HRB-HDY-NVY-S',
    shopifyStock: 43,
    reorderPoint: 36,
    velocity: 14,
    syncStatus: 'pending',
    risk: 'medium'
  },
  {
    id: 'sku-1007',
    product: 'Axis Compression Short',
    sku: 'AXS-SRT-BLK-L',
    shopifyStock: 76,
    reorderPoint: 42,
    velocity: 16,
    syncStatus: 'pending',
    risk: 'low'
  },
  {
    id: 'sku-1008',
    product: 'Meridian Canvas Tote',
    sku: 'MRD-TOT-CRM-OS',
    shopifyStock: 5,
    reorderPoint: 18,
    velocity: 8,
    syncStatus: 'pending',
    risk: 'critical'
  },
  {
    id: 'sku-1009',
    product: 'Summit Recovery Slide',
    sku: 'SMT-SLD-BNE-09',
    shopifyStock: 34,
    reorderPoint: 28,
    velocity: 10,
    syncStatus: 'pending',
    risk: 'medium'
  },
  {
    id: 'sku-1010',
    product: 'Forge Performance Jogger',
    sku: 'FRG-JGR-CHR-M',
    shopifyStock: 92,
    reorderPoint: 45,
    velocity: 19,
    syncStatus: 'pending',
    risk: 'low'
  },
  {
    id: 'sku-1011',
    product: 'Pulse Reflective Cap',
    sku: 'PLS-CAP-BLK-OS',
    shopifyStock: 14,
    reorderPoint: 22,
    velocity: 7,
    syncStatus: 'pending',
    risk: 'high'
  },
  {
    id: 'sku-1012',
    product: 'Lumen Grip Sock',
    sku: 'LMN-SCK-WHT-M',
    shopifyStock: 187,
    reorderPoint: 80,
    velocity: 41,
    syncStatus: 'pending',
    risk: 'low'
  },
  {
    id: 'sku-1013',
    product: 'Vector Rain Shell',
    sku: 'VCT-SHL-SGE-L',
    shopifyStock: 27,
    reorderPoint: 32,
    velocity: 12,
    syncStatus: 'pending',
    risk: 'high'
  },
  {
    id: 'sku-1014',
    product: 'Orbit Crossbody Sling',
    sku: 'ORB-SLG-ONY-OS',
    shopifyStock: 68,
    reorderPoint: 34,
    velocity: 15,
    syncStatus: 'pending',
    risk: 'medium'
  },
  {
    id: 'sku-1015',
    product: 'Terra Training Mat',
    sku: 'TRR-MAT-GRN-72',
    shopifyStock: 11,
    reorderPoint: 20,
    velocity: 6,
    syncStatus: 'pending',
    risk: 'high'
  },
  {
    id: 'sku-1016',
    product: 'Beacon Insulated Vest',
    sku: 'BCN-VST-RST-M',
    shopifyStock: 153,
    reorderPoint: 50,
    velocity: 17,
    syncStatus: 'pending',
    risk: 'low'
  },
  {
    id: 'sku-1017',
    product: 'RidgeLine Cargo Pant',
    sku: 'RDL-CRG-ASH-32',
    shopifyStock: 46,
    reorderPoint: 38,
    velocity: 14,
    syncStatus: 'pending',
    risk: 'medium'
  },
  {
    id: 'sku-1018',
    product: 'Nova Seamless Tank',
    sku: 'NVA-TNK-BLS-M',
    shopifyStock: 63,
    reorderPoint: 42,
    velocity: 21,
    syncStatus: 'pending',
    risk: 'medium'
  },
  {
    id: 'sku-1019',
    product: 'Echo Training Glove',
    sku: 'ECH-GLV-BLK-L',
    shopifyStock: 22,
    reorderPoint: 26,
    velocity: 9,
    syncStatus: 'pending',
    risk: 'high'
  },
  {
    id: 'sku-1020',
    product: 'Cinder Trail Short',
    sku: 'CND-SRT-RST-M',
    shopifyStock: 88,
    reorderPoint: 44,
    velocity: 18,
    syncStatus: 'pending',
    risk: 'low'
  },
  {
    id: 'sku-1021',
    product: 'Prism Running Belt',
    sku: 'PRS-BLT-SMK-OS',
    shopifyStock: 16,
    reorderPoint: 24,
    velocity: 7,
    syncStatus: 'pending',
    risk: 'high'
  },
  {
    id: 'sku-1022',
    product: 'Crest Fleece Crew',
    sku: 'CRS-CRW-MOS-L',
    shopifyStock: 132,
    reorderPoint: 55,
    velocity: 20,
    syncStatus: 'pending',
    risk: 'low'
  },
  {
    id: 'sku-1023',
    product: 'Ion Recovery Wrap',
    sku: 'ION-WRP-GRY-OS',
    shopifyStock: 7,
    reorderPoint: 18,
    velocity: 5,
    syncStatus: 'pending',
    risk: 'critical'
  },
  {
    id: 'sku-1024',
    product: 'Atlas Duffel 40L',
    sku: 'ATL-DFL-BLK-40',
    shopifyStock: 71,
    reorderPoint: 36,
    velocity: 12,
    syncStatus: 'pending',
    risk: 'medium'
  },
  {
    id: 'sku-1025',
    product: 'Solstice Windbreaker',
    sku: 'SLS-WND-CLY-M',
    shopifyStock: 39,
    reorderPoint: 34,
    velocity: 13,
    syncStatus: 'pending',
    risk: 'medium'
  },
  {
    id: 'sku-1026',
    product: 'Tempo Knit Beanie',
    sku: 'TMP-BNE-CHR-OS',
    shopifyStock: 104,
    reorderPoint: 48,
    velocity: 16,
    syncStatus: 'pending',
    risk: 'low'
  }
]

const tiktokInventory: TikTokData['inventory'] = [
  { id: 'sku-1001', sku: 'APX-JKT-BLK-M', tiktokStock: 124 },
  { id: 'sku-1002', sku: 'NRD-PCK-GRY-18', tiktokStock: 23 },
  { id: 'sku-1003', sku: 'CRF-TEE-WHT-L', tiktokStock: 211 },
  { id: 'sku-1004', sku: 'SIG-SNK-OLV-10', tiktokStock: 0 },
  { id: 'sku-1005', sku: 'VLT-BTL-STL-32', tiktokStock: 52 },
  { id: 'sku-1006', sku: 'HRB-HDY-NVY-S', tiktokStock: 43 },
  { id: 'sku-1007', sku: 'AXS-SRT-BLK-L', tiktokStock: 71 },
  { id: 'sku-1008', sku: 'MRD-TOT-CRM-OS', tiktokStock: 5 },
  { id: 'sku-1009', sku: 'SMT-SLD-BNE-09', tiktokStock: 29 },
  { id: 'sku-1010', sku: 'FRG-JGR-CHR-M', tiktokStock: 92 },
  { id: 'sku-1011', sku: 'PLS-CAP-BLK-OS', tiktokStock: 18 },
  { id: 'sku-1012', sku: 'LMN-SCK-WHT-M', tiktokStock: 187 },
  { id: 'sku-1013', sku: 'VCT-SHL-SGE-L', tiktokStock: 39 },
  { id: 'sku-1014', sku: 'ORB-SLG-ONY-OS', tiktokStock: 64 },
  { id: 'sku-1015', sku: 'TRR-MAT-GRN-72', tiktokStock: 9 },
  { id: 'sku-1016', sku: 'BCN-VST-RST-M', tiktokStock: 153 },
  { id: 'sku-1017', sku: 'RDL-CRG-ASH-32', tiktokStock: 51 },
  { id: 'sku-1018', sku: 'NVA-TNK-BLS-M', tiktokStock: 57 },
  { id: 'sku-1019', sku: 'ECH-GLV-BLK-L', tiktokStock: 31 },
  { id: 'sku-1020', sku: 'CND-SRT-RST-M', tiktokStock: 88 },
  { id: 'sku-1021', sku: 'PRS-BLT-SMK-OS', tiktokStock: 13 },
  { id: 'sku-1022', sku: 'CRS-CRW-MOS-L', tiktokStock: 132 },
  { id: 'sku-1023', sku: 'ION-WRP-GRY-OS', tiktokStock: 0 },
  { id: 'sku-1024', sku: 'ATL-DFL-BLK-40', tiktokStock: 66 },
  { id: 'sku-1025', sku: 'SLS-WND-CLY-M', tiktokStock: 45 },
  { id: 'sku-1026', sku: 'TMP-BNE-CHR-OS', tiktokStock: 104 }
]

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getShopifyData(): Promise<ShopifyData> {
  await wait(200)

  return {
    status: 'healthy',
    responseTimeMs: 186,
    lastSync: new Date(Date.now() - 1000 * 45).toISOString(),
    inventory: shopifyInventory
  }
}

export async function getTikTokData(mode?: 'success' | 'error'): Promise<TikTokData> {
  await wait(5000)

  const shouldFail = mode === 'error' || (mode !== 'success' && Math.random() < 0.5)

  if (shouldFail) {
    throw new Error('TikTok inventory service failed to respond')
  }

  return {
    status: 'delayed',
    responseTimeMs: 4984,
    lastSync: new Date(Date.now() - 1000 * 60 * 17).toISOString(),
    lastSuccessfulSync: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
    delayMinutes: 17,
    inventory: tiktokInventory
  }
}

export function buildShopifyHealth(data: ShopifyData): PlatformHealth {
  return {
    platform: 'shopify',
    status: data.status,
    responseTimeMs: data.responseTimeMs,
    lastSync: data.lastSync,
    lastSuccessfulSync: data.lastSync,
    delayMinutes: 0,
    retryable: false
  }
}

export function buildTikTokHealth(data: TikTokData): PlatformHealth {
  return {
    platform: 'tiktok',
    status: data.status,
    responseTimeMs: data.responseTimeMs,
    lastSync: data.lastSync,
    lastSuccessfulSync: data.lastSuccessfulSync,
    delayMinutes: data.delayMinutes,
    retryable: true
  }
}

export function mergeInventory(shopify: Array<InventoryItem>, tiktok?: TikTokData) {
  const tiktokBySku = new Map(tiktok?.inventory.map((item) => [item.sku, item]))

  return shopify.map((item) => {
    const match = tiktokBySku.get(item.sku)
    const syncStatus = getSyncStatus(item.shopifyStock, match?.tiktokStock)

    return {
      ...item,
      tiktokStock: match?.tiktokStock,
      syncStatus,
      risk: getRiskLevel(item.shopifyStock, item.reorderPoint, syncStatus)
    }
  })
}

export function buildAlerts(inventory: Array<InventoryItem>, tiktok?: TikTokData): Array<OperationalAlert> {
  const now = Date.now()
  const alerts: Array<OperationalAlert> = []

  for (const item of inventory) {
    if (item.shopifyStock <= item.reorderPoint) {
      alerts.push({
        id: `low-${item.id}`,
        title: item.shopifyStock <= 10 ? 'Critical inventory threshold' : 'Low inventory threshold',
        description: `${item.product} is at ${item.shopifyStock} units in Shopify.`,
        severity: item.shopifyStock <= 10 ? 'critical' : 'warning',
        platform: 'shopify',
        createdAt: new Date(now - 1000 * 60 * (item.shopifyStock + 2)).toISOString()
      })
    }

    if (item.syncStatus === 'out_of_sync' || item.syncStatus === 'critical') {
      alerts.push({
        id: `mismatch-${item.id}`,
        title: 'Inventory mismatch detected',
        description: `${item.sku} differs between Shopify and TikTok by ${Math.abs(
          item.shopifyStock - (item.tiktokStock ?? item.shopifyStock)
        )} units.`,
        severity: item.syncStatus === 'critical' ? 'critical' : 'warning',
        platform: 'sync',
        createdAt: new Date(now - 1000 * 60 * 11).toISOString()
      })
    }
  }

  if (!tiktok) {
    alerts.unshift({
      id: 'tiktok-loading',
      title: 'TikTok inventory pending',
      description: 'Shopify data is live while TikTok inventory continues loading.',
      severity: 'info',
      platform: 'tiktok',
      createdAt: new Date(now - 1000 * 30).toISOString()
    })
  } else if (tiktok.delayMinutes > 10) {
    alerts.unshift({
      id: 'tiktok-delay',
      title: 'TikTok sync delay',
      description: `TikTok inventory is ${tiktok.delayMinutes} minutes behind the last Shopify sync.`,
      severity: 'warning',
      platform: 'tiktok',
      createdAt: new Date(now - 1000 * 60 * 4).toISOString()
    })
  }

  return alerts.slice(0, 8)
}

function getSyncStatus(shopifyStock: number, tiktokStock?: number): SyncStatus {
  if (typeof tiktokStock !== 'number') {
    return 'pending'
  }

  if (shopifyStock <= 10 || tiktokStock <= 10) {
    return 'critical'
  }

  const delta = Math.abs(shopifyStock - tiktokStock)

  if (delta === 0) {
    return 'synced'
  }

  if (delta <= 5) {
    return 'delayed'
  }

  return 'out_of_sync'
}

function getRiskLevel(stock: number, reorderPoint: number, syncStatus: SyncStatus): InventoryItem['risk'] {
  if (stock <= 10 || syncStatus === 'critical') {
    return 'critical'
  }

  if (stock <= reorderPoint || syncStatus === 'out_of_sync') {
    return 'high'
  }

  if (stock <= reorderPoint * 1.5 || syncStatus === 'delayed') {
    return 'medium'
  }

  return 'low'
}
