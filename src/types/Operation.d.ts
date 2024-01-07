export type Operation = {
  description: string,
  serialNumber: string,
  unitCost: number,
  quantity: number,
  importSale: number,
  details: string,
  transactionId: number,
  productId: number,
  createdAt: string
}

export type OperationFromDB = {
  description: string,
  serialNumber: string,
  unitCost: number,
  quantity: number,
  importSale: number,
  details: string,
  productId: number,
  transactionId: number,
  createdAt: string
}

export type OperationToDB = {
  description: string,
  serialNumber: string,
  unitCost: number,
  quantity: number,
  importSale: number,
  details: string,
  productId: number,
}
