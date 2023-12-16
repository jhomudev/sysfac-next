import TableInventary from '@/modules/Inventary/components/TableInventary'
import { Divider } from '@nextui-org/divider'

function InventaryPage () {
  return (
    <div className='flex-1 p-2'>
      <h1 className='title-main'>Inventario</h1>
      <p className='text'>Gestiona las unidades existentes en el inventario dentro del sistema, puede modificar el estado de las unidades, o eliminarlos.</p>
      <br />
      <Divider />
      <br />
      <TableInventary />
    </div>
  )
}
export default InventaryPage
