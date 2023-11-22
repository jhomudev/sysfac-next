export interface ApiResponse {
  ok: boolean,
  message: string,
}

export interface ApiResponseWithReturn<T> extends ApiResponse {
  data: T
}
