import { ReadonlyURLSearchParams } from 'next/navigation'

type Props = {
  pathname: string | null,
  searchParams: ReadonlyURLSearchParams | null,
  newParams: object,
  paramsDelete?: string[]
}
function getURLWithParams ({ pathname, searchParams, newParams, paramsDelete }: Props) {
  if (!pathname || !searchParams) return ''
  const params = new URLSearchParams(searchParams)
  const newParamsArr = Object.entries(newParams)
  newParamsArr.forEach(([key, value]) => params.set(key, value))
  paramsDelete?.forEach(param => params.delete(param))

  return `${pathname}?${params.toString()}`
}
export default getURLWithParams
