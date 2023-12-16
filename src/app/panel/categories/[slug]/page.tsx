import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormCategory from '@/modules/Categories/components/FormCategory'
import { getCategoryBySlug } from '@/modules/Categories/services'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

type Props = {
  params: Params
}

async function page ({ params }: Props) {
  const { slug } = params
  const category = await getCategoryBySlug(slug)
  if (!category) return <p className='text-danger'>Categoría no encontrada</p>

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
      label: category.name
    }
  ]

  return (
    <>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <div className='flex flex-col w-[min(100%,800px)]'>
        <h1 className='text-xl font-semibold'>{category.name}</h1>
        <br />
        <FormCategory category={category} />
      </div>
    </>
  )
}
export default page
