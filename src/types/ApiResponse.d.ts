export type ApiResponse = {
  ok: boolean,
  message: string,
  data?: any
}

export type ApiResponseError = {
  error: unknown,
  message: string,
}

export type ApiResponseWithReturn<T> = {
  ok: boolean,
  message: string,
  data: T,
  meta?: {
    rowsObtained: number,
    totalRows: number,
    page: number,
    rowsPerPage: number
  }
}
