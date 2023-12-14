'use client'
import ROUTES from '@/app/routes'
import Yesicon from '@/components/Yesicon'
import { COLORS_ENT, ICONS } from '@/contants'
import { User, EUserType, EUserState, ApiResponseWithReturn, UserFromDB } from '@/types'
import NextLink from 'next/link'
import {
  Table, TableBody, TableColumn, TableHeader, TableCell, TableRow,
  Chip, Input, Button, Pagination, Selection,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Link, Spinner
} from '@nextui-org/react'
import React from 'react'
import useSWR from 'swr'
import { formatUser } from '@/adapters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { fetcher } from '@/libs/swr'
import { getURLWithParams } from '@/types/utils'

const headerColumns = [
  {
    id: crypto.randomUUID(),
    name: 'Nombre de usuario'
  },
  {
    id: crypto.randomUUID(),
    name: 'Nombres'
  },
  {
    id: crypto.randomUUID(),
    name: 'Apellidos'
  },
  {
    id: crypto.randomUUID(),
    name: 'Tipo'
  },
  {
    id: crypto.randomUUID(),
    name: 'Estado'
  },
  {
    id: crypto.randomUUID(),
    name: 'Correo'
  },
  {
    id: crypto.randomUUID(),
    name: 'Teléfono'
  },
  {
    id: crypto.randomUUID(),
    name: 'Acciones'
  }
]

function TableUsers () {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const url = searchParams ? `/api/users?${searchParams.toString()}` : '/api/users'
  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<UserFromDB[]>>(url, fetcher, {
    keepPreviousData: true
  })
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)
  const [userToDelete, setUserToDelete] = React.useState<User>({} as User)

  if (error) console.log('ocurrió un error:', error)
  const users = React.useMemo(() => data?.data?.map(user => formatUser(user)) || [], [data])

  const handleChangePage = React.useCallback((page: number) => {
    const url = getURLWithParams({
      pathname,
      searchParams,
      newParams: { page }
    })
    replace(url)
  }, [searchParams, pathname, replace])

  const handleChangeRowsPerPage = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const url = getURLWithParams({
      pathname,
      searchParams,
      newParams: { rowsPerPage: value },
      paramsDelete: ['page']
    })
    replace(url)
  }, [searchParams, pathname, replace])

  const handleChangeSearch = useDebouncedCallback((value) => {
    const url = getURLWithParams({
      pathname,
      searchParams,
      newParams: { q: value, page: 1 },
      paramsDelete: !value ? ['q', 'page'] : ['page']
    })
    replace(url)
  }, 600)

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className='flex gap-3 items-center justify-between'>
          <Input
            className='w-[min(100%,400px)]'
            placeholder='Buscar usuario'
            isClearable
            defaultValue={searchParams?.get('q') ?? ''}
            startContent={<Yesicon icon={ICONS.search} />}
            onValueChange={handleChangeSearch}
          />
          <Button as={Link} href={`${ROUTES.users}/create`} color='primary' startContent={<Yesicon icon={ICONS.plus} />}>Nuevo usuario</Button>
        </div>
        <div className='flex items-center justify-between'>
          {data && <p>Total de usuarios <span className='font-medium'>{data.meta?.totalRows}</span></p>}
          {
            data?.meta?.rowsPerPage &&
              <div className='flex items-center gap-2'>
                <span>Resultados por página</span>
                <select onChange={handleChangeRowsPerPage} defaultValue={data?.meta?.rowsPerPage}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
          }
        </div>
      </>
    )
  }, [data, searchParams, handleChangeRowsPerPage, handleChangeSearch])

  const bottomContent = React.useMemo(() => {
    if (!data?.meta) return
    const { page, rowsObtained, rowsPerPage } = data.meta
    const totalPages = Math.ceil(rowsObtained / rowsPerPage)
    return (
      <>
        {
          data &&
            <div className='flex gap-3 items-center justify-between'>
              <p>{selectedKeys instanceof Set ? `${selectedKeys.size} filas de 20 seleccionadas` : 'Todos las filas seleccionadas'}</p>
              <Pagination
                showControls
                total={totalPages}
                page={page}
                onChange={handleChangePage}
              />
            </div>
        }
      </>
    )
  }, [data, selectedKeys, handleChangePage])

  return (
    <>
      <Table
        isHeaderSticky
        aria-label='Tabla de usuarios'
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'flex-1 max-h-[1000px]',
          table: 'min-h-[20rem]'
        }}
        selectedKeys={selectedKeys}
        selectionMode='multiple'
        topContent={topContent}
        bottomContent={bottomContent}
        topContentPlacement='outside'
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              className='uppercase'
              key={column.id}
              align={column.id === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={!isLoading && 'No se econtraron usuarios'}
          items={users}
          isLoading={isLoading}
          loadingContent={
            <Spinner>Cargando datos...</Spinner>
          }
        >
          {(user) => {
            const colorUserState = user.state === EUserState.active ? COLORS_ENT.userState.active.nextui : COLORS_ENT.userState.inactive.nextui
            const colorUserType = user.type === EUserType.admin
              ? COLORS_ENT.userType.admin.nextui
              : user?.type === EUserType.seller ? COLORS_ENT.userType.seller.nextui : COLORS_ENT.userType.superadmin.nextui
            return (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.names}</TableCell>
                <TableCell>{user.lastnames}</TableCell>
                <TableCell><Chip variant='flat' color={colorUserType}>{user.type}</Chip></TableCell>
                <TableCell><Chip variant='dot' color={colorUserState}>{user.state}</Chip></TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size='sm' variant='light'>
                        <Yesicon icon={ICONS.options} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label='actions'
                      variant='flat' onAction={(key) => {
                        if (key === 'delete') {
                          setUserToDelete(user)
                          setIsOpenModal(true)
                        }
                      }}
                    >
                      <DropdownItem as={NextLink} key='view' startContent={<Yesicon icon={ICONS.view} />} href={`${ROUTES.users}/${user.username}`}>Ver</DropdownItem>
                      <DropdownItem as={NextLink} key='edit' startContent={<Yesicon icon={ICONS.edit} />} href={`${ROUTES.users}/${user.username}/edit`}>Editar</DropdownItem>
                      <DropdownItem key='delete' startContent={<Yesicon icon={ICONS.delete} />} color='danger' className='text-danger'>Eliminar</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )
          }}
        </TableBody>
      </Table>
      <Modal placement='top' isOpen={isOpenModal} onOpenChange={setIsOpenModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>¿Estás seguro de eliminar el usuario <b>{userToDelete?.names} {userToDelete?.lastnames}</b>?</p>
                <em className='text-danger text-small'>OJO: Esta acción es irreversible.</em>
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
export default TableUsers
