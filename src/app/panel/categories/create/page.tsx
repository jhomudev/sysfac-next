import ROUTES from '@/app/routes'
import MyBreadcrumbs, { MyBreadcrumbItemProps } from '@/components/MyBreadcrumbs'
import FormCategoryCreate from '@/features/FormCategoryCreate'

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
    label: 'Crear categoría'
  }
]
function CreateCategoryPage () {
  return (
    <div>
      <MyBreadcrumbs items={breadcrumbItems} />
      <br />
      <div className='flex flex-col w-[min(100%,800px)]'>
        <h1 className='text-xl font-semibold'>Crear categoría</h1>
        <br />
        <FormCategoryCreate />
      </div>
    </div>
  )
}
export default CreateCategoryPage
