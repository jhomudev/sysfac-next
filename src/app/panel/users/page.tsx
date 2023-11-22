'use client'
import ROUTES from '@/app/routes'
import Yesicon, { CLASS_ICONS } from '@/components/Yesicon'
import { EUserType } from '@/types/enumDB'
import { TUser } from '@/types/types'
import { Table, TableBody, TableColumn, TableHeader, TableCell, TableRow, Chip, Input, Button, Pagination, Selection, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Link } from '@nextui-org/react'
import React from 'react'

const headerColumns = [
  {
    id: crypto.randomUUID(),
    name: 'Nombre de usuario',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Nombres',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Apellidos',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Tipo',
    sortable: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Correo',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Teléfono',
    sortable: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Acciones',
    sortable: false
  }
]

const data:Partial<TUser>[] = [
  {
    userId: 1,
    username: 'usuario1',
    names: 'Juan',
    lastnames: 'Perez',
    type: EUserType.admin,
    email: 'juan.perez@email.com',
    phone: '123456789'
  },
  {
    userId: 2,
    username: 'usuario2',
    names: 'Carlos',
    lastnames: 'Ramirez',
    type: EUserType.seller,
    email: 'carlos.ramirez@email.com',
    phone: '123456780'
  }
]

function UsersPage () {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)
  const [userToDelete, setUserToDelete] = React.useState<string | null>(null)

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input isClearable className='w-[min(100%,400px)]' placeholder='Buscar usuario' startContent={<Yesicon icon={CLASS_ICONS.search} />} />
          <Button as={Link} href={`${ROUTES.users}/create`} color='primary' startContent={<Yesicon icon={CLASS_ICONS.plus} />}>Nuevo usuario</Button>
        </div>
        <div className='flex items-center justify-between'>
          <p>Total de usuarios <span className='font-medium'>12</span></p>
          <div className='flex items-center gap-2'>
            <span>Resultados por página</span>
            <select>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </div>
        </div>
      </>
    )
  }, [])

  const bottomContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <p>{selectedKeys instanceof Set ? `${selectedKeys.size} filas de 20 seleccionadas` : 'Todos las filas seleccionadas'}</p>
          <Pagination showControls total={10} initialPage={1} />
        </div>
      </>
    )
  }, [selectedKeys])

  return (
    <>
      <Table
        isHeaderSticky
        aria-label='Tabla de usuarios'
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'max-h-[382px]'
        }}
        selectedKeys={selectedKeys}
        selectionMode='multiple'
        // sortDescriptor={sortDescriptor}
        topContent={topContent}
        bottomContent={bottomContent}
        topContentPlacement='outside'
        onSelectionChange={setSelectedKeys}
        // onSortChange={() = >{}}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              className='uppercase'
              key={column.id}
              align={column.id === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent='No se econtraron usuarios' items={data}>
          {(item) => (
            <TableRow key={item.userId}>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.names}</TableCell>
              <TableCell>{item.lastnames}</TableCell>
              <TableCell><Chip variant='flat' color={item.type === EUserType.admin ? 'success' : item.type === EUserType.superadmin ? 'secondary' : 'warning'}>{item.type}</Chip></TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size='sm' variant='light'>
                      <Yesicon icon={CLASS_ICONS.options} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label='actions'
                    variant='flat' onAction={(key) => {
                      if (key === 'delete') {
                        setUserToDelete(item.username!)
                        setIsOpenModal(true)
                      }
                    }}
                  >
                    <DropdownItem key='view' startContent={<Yesicon icon={CLASS_ICONS.view} />} href={`${ROUTES.users}/${item.username}`}>Ver</DropdownItem>
                    <DropdownItem key='edit' startContent={<Yesicon icon={CLASS_ICONS.edit} />} href={`${ROUTES.users}/${item.username}/edit`}>Editar</DropdownItem>
                    <DropdownItem key='delete' startContent={<Yesicon icon={CLASS_ICONS.delete} />} color='danger' className='text-danger'>Eliminar</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal placement='top' isOpen={isOpenModal} onOpenChange={setIsOpenModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>¿Estás seguro de eliminar este usuario?</p>
                <small className='text-danger'><em>OJO: Esta acción es irreversible.</em></small>
                <p>{userToDelete}</p>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button color='danger' onPress={onClose}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default UsersPage
