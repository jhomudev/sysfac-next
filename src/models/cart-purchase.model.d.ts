export type CartPurchaseItemId = ReturnType<typeof crypto.randomUUID>

export type CartPurchaseItemWhithoutId = {
  productId: number,
  product: string,
  serialNumber: string,
  cost: number,
  priceSale: number,
  quantity: number,
  total: number
}

export type CartPurchaseItem = {
  itemId: CartPurchaseItemId
} & CartPurchaseItemWhithoutId

export type CartPurchase = {
  items: CartPurchaseItem[],
  totalImport: number
}
