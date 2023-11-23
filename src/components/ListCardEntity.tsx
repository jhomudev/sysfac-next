'use client'

import CardEntityDashboard, { CardEntityDashboardProps } from './CardEntityDashboard'

type Props = {
  items: CardEntityDashboardProps[]
}

function ListCardEntity ({ items }: Props) {
  return (
    <>
      {
        items.map(item => (
          <CardEntityDashboard key={item.label} {...item} />
        ))
      }
    </>
  )
}
export default ListCardEntity
