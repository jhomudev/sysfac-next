export interface ApiResponse {
  ok: boolean,
  message: string,
  data?: unknown
}

export interface ApiResponseError {
  error: unknown,
  message: string,
}

export interface ApiResponseWithReturn<T> extends ApiResponse {
  ok: boolean,
  message: string,
  data: T,
  meta?: {
    rowsObtained: number,
    totalRows: number
  }
}
