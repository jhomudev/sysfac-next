// get query params per WHERE clausure
export const DEFAULT_PARAMS = {
  rowsPerPage: 10,
  page: 1,
  sort: 'DESC'
}
type Props = {
  URLSearchParams: URLSearchParams,
  paramsCols: string[],
  likeColumn: string,
  orderByColumn: string
}

function getQueryParams ({ URLSearchParams, paramsCols = [], likeColumn, orderByColumn }: Props) {
  const params = Object.fromEntries(URLSearchParams)
  // define values with deafutl values
  const rowsPerPage = params.rowsPerPage ? parseInt(params.rowsPerPage) : DEFAULT_PARAMS.rowsPerPage
  const page = params.page ? parseInt(params.page) : DEFAULT_PARAMS.page
  const sort = params.sort ?? DEFAULT_PARAMS.sort

  // si tiene el param q para busqueda x keyword
  const hasQLike = !!params.q
  // si el param es una columna de la db para filtrado
  const isAParamCol = (param: string) => paramsCols.includes(param)

  const queryLike = hasQLike ? `${likeColumn} LIKE "%${params.q}%"` : ''
  const queryOrderBy = `ORDER BY ${orderByColumn} ${sort}`
  const queryPage = `LIMIT ${rowsPerPage} OFFSET ${(page - 1) * rowsPerPage}`
  const queryWhere = (() => {
    if (!params) return ''
    const paramsArray = Object.entries(params)
    const keysOfParams = Object.keys(params)
    const hasParamsCols = paramsCols.some(param => keysOfParams.includes(param))
    const queryArray = []
    for (const [property, value] of paramsArray) {
      if (isAParamCol(property) && value) {
        const isValuesNumeric = isNaN(parseFloat(value))
        queryArray.push(isValuesNumeric ? `LOWER(${property})=${`"${value}"`}` : `${property}=${`${value}`}`)
      }
    }
    if (hasQLike) queryArray.push(queryLike)
    return hasParamsCols || hasQLike ? `WHERE ${queryArray.join(' AND ')}` : ''
  })()
  const queryParamsComplete = `${queryWhere} ${queryOrderBy} ${queryPage}`
  const queryParamsNoLimit = `${queryWhere} ${queryOrderBy}`

  return {
    queryParamsComplete,
    queryParamsNoLimit
  }
}

export default getQueryParams
