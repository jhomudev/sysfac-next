'use client'
import { Button, Select, SelectItem } from '@nextui-org/react'

const itemsCategories = [
  {
    label: 'PC',
    value: 'pc'
  },
  {
    label: 'Laptops',
    value: 'laptops'
  },
  {
    label: 'Monitores',
    value: 'monitores'
  },
  {
    label: 'mouses',
    value: 'mouses'
  }
]

function FiltersProductsPerSale () {
  return (
    <div className='flex items-center flex-wrap gap-5'>
      <Button className='w-min' color='secondary' variant='bordered'>Todas</Button>
      <Select size='sm' className='w-full sm:max-w-md' color='secondary' variant='bordered' items={itemsCategories} label='Categoría'>
        {
          (item) => (
            <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
          )
        }
      </Select>
    </div>
  )
}
export default FiltersProductsPerSale
