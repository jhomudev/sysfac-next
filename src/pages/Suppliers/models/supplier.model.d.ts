export interface Supplier {
  id: number,
  RUC: `${number}`,
  name: string,
  address: string,
  phone: `${number}` | null,
  createdAt: string
  updatedAt: string
}
