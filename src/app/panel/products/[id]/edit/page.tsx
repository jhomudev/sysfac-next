'use client'
import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormProductEdit from '@/pages/Productos/componentes/FormProductsEdit'
import { Category, ESaleFor, Product } from '@/types'

type Props = {
  params: {
    id: `${number}`
  }
}

const product : Product = {
  id: 1,
  name: 'Pc Hp',
  image: 'https://unavatar.io/pikachu',
  inventaryMin: 5,
  priceSale: 12.50,
  unit: 'Unidad',
  saleFor: ESaleFor.unit,
  isActive: true,
  category: {
    id: 1,
    slug: 'pc',
    name: 'Pc'
  },
  createdAt: '2023-11-21 15:45:21',
  updatedAt: '2023-11-21 15:45:21'
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Laptops',
    slug: 'laptops',
    image: 'https://i.insider.com/61a930fc5d47cc0018e9160c?width=700',
    createdAt: '2023-11-21 15:45:21',
    updatedAt: '2023-11-21 15:45:21'
  },
  {
    id: 2,
    name: 'PC',
    slug: 'pc',
    image: 'https://i.insider.com/61a930fc5d47cc0018e9160c?width=700',
    createdAt: '2023-11-21 15:45:21',
    updatedAt: '2023-11-21 15:45:21'
  },
  {
    id: 3,
    name: 'Mouses',
    slug: 'mouses',
    image: 'https://assetsio.reedpopcdn.com/g502x_f9QuuM8.jpeg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp',
    createdAt: '2023-11-21 15:45:21',
    updatedAt: '2023-11-21 15:45:21'
  },
  {
    id: 4,
    name: 'Teclado',
    slug: 'teclado',
    image: 'https://i.blogs.es/8c11b5/teclados-ap/1366_2000.jpeg',
    createdAt: '2023-11-21 15:45:21',
    updatedAt: '2023-11-21 15:45:21'
  },
  {
    id: 5,
    slug: 'impresoras',
    name: 'Impresoras',
    image: '',
    createdAt: '2023-11-21 15:45:21',
    updatedAt: '2023-11-21 15:45:21'
  },
  {
    id: 6,
    name: 'Monitores',
    slug: 'monitores',
    image: '',
    createdAt: '2023-11-21 15:45:21',
    updatedAt: '2023-11-21 15:45:21'
  },
  {
    id: 7,
    slug: 'teclado',
    name: 'teclados',
    image: '',
    createdAt: '2023-11-21 15:45:21',
    updatedAt: '2023-11-21 15:45:21'
  }
]

function EditProductPage ({ params }: Props) {
  const { id } = params
  const breadcrumbItems:MyBreadcrumbItemProps[] = [
    {
      label: 'Home',
      route: ROUTES.panel
    },
    {
      label: 'Productos',
      route: ROUTES.products
    },
    {
      label: product.name
    }
  ]

  return (
    <>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <div className='flex flex-col w-[min(100%,800px)]'>
        <h1 className='text-xl font-semibold'>Editar producto {id}</h1>
        <br />
        <FormProductEdit product={product} categoriesPerSelect={categories} />
      </div>
    </>
  )
}
export default EditProductPage
