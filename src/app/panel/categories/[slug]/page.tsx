import ROUTES from '@/app/routes'
import { MyBreadcrumbs } from '@/components'
import { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import { FormCategory } from '@/pages/Categories/components'
import { Category } from '@/pages/Categories/models'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

type Props = {
  params: Params
}

function page ({ params }: Props) {
  const { slug } = params

  const breadcrumbItems:MyBreadcrumbItemProps[] = [
    {
      label: 'Home',
      route: ROUTES.panel
    },
    {
      label: 'Categorías',
      route: ROUTES.categories
    },
    {
      label: slug
    }
  ]

  const categoryData:Category = {
    id: 1,
    name: 'Laptops',
    slug: 'laptops',
    image: 'https://assetsio.reedpopcdn.com/g502x_f9QuuM8.jpeg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp',
    createdAt: '2023-11-21 15:45:21',
    updatedAt: '2023-11-21 15:45:21'
  }

  return (
    <div>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <div className='flex flex-col w-[min(100%,800px)]'>
        <h1 className='text-xl font-semibold'>Laptops</h1>
        <br />
        <FormCategory categoryData={categoryData} />
      </div>
    </div>
  )
}
export default page
