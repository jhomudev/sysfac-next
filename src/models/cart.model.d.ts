export type CartItemId = ReturnType<typeof crypto.randomUUID>

export type CartItemWithoutId = {
  productId: number,
  product: string,
  serialNumber: string,
  unitPrice: number,
  quantity: number,
  total: number
}

export type CartItem = {
  itemId: CartItemId,
} & CartItemWithoutId

export type Cart = {
  items: CartItem[],
  discount: number,
  // import: number,
  // totalImport: number
}
