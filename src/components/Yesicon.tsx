'use client'
import { Icon, IconProps } from '@iconify/react'

export const CLASS_ICONS = {
  // matertial
  options: 'simple-line-icons:options-vertical',
  password: 'carbon:password',
  show: 'clarity:eye-show-line',
  hidden: 'formkit:hidden',
  user: 'ph:user',
  plus: 'ph:plus-bold',
  logout: 'material-symbols:logout-rounded',
  dashboard: 'material-symbols:dashboard-outline',
  search: 'ri:search-line',
  delete: 'material-symbols:delete-outline-rounded',
  edit: 'lucide:edit',
  view: 'iconamoon:link-external-light',
  cart: 'mdi:cart-outline',
  notifications: 'material-symbols:notifications-active-outline',
  time: 'mdi:timer-outline',
  clean: 'mingcute:broom-line',
  tag: 'mdi:tag-arrow-right-outline',
  ticket: 'bi:ticket-detailed',
  // entities
  products: 'system-uicons:box-open',
  categories: 'material-symbols:list',
  transactions: 'ri:exchange-cny-line',
  suppliers: 'ph:user-list-bold',
  locations: 'ph:warehouse',
  clients: 'fluent:people-28-regular',
  users: 'material-symbols:manage-accounts-outline',
  sales: 'mdi:cart-outline',
  purchases: 'ri:exchange-cny-line'
}

export function Yesicon (Props: IconProps) {
  return <Icon {...Props} />
}
