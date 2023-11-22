export const NEXTUI_COLORS = {
  default: '#3f3f46',
  primary: '#006FEE',
  secondary: '#9353d3',
  success: '#17c964',
  danger: '#f31260',
  warning: '#f5a524'
}

export type THeaderColumn = {
  id: string
  name: string,
  sortable?: boolean,
  align?: 'start' | 'center' | 'end'
}
