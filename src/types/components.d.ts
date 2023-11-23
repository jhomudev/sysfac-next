export type TableHeaderColumns = {
  id: string,
  name: string,
  sortable?: boolean,
  align?: 'start' | 'center' | 'end'
}

export type SelectTagItem = {
  label: string,
  value: string | number
}
