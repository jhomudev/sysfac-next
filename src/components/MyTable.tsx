// 'use client'
// import Yesicon from '@/components/Yesicon'
// import { EUserType } from '@/types/enumDB'
// import { TUser } from '@/types/types'
// import { Divider, Table, TableBody, TableColumn, TableHeader, TableCell, TableRow, Chip, Input, Button, Pagination } from '@nextui-org/react'
// import React from 'react'

// const headerColumns = [
//   {
//     id: crypto.randomUUID(),
//     name: 'Nombre de usuario',
//     sortable: false
//   },
//   {
//     id: crypto.randomUUID(),
//     name: 'Nombres',
//     sortable: false
//   },
//   {
//     id: crypto.randomUUID(),
//     name: 'Apellidos',
//     sortable: false
//   },
//   {
//     id: crypto.randomUUID(),
//     name: 'Tipo',
//     sortable: true
//   },
//   {
//     id: crypto.randomUUID(),
//     name: 'Correo',
//     sortable: false
//   },
//   {
//     id: crypto.randomUUID(),
//     name: 'Teléfono',
//     sortable: false
//   }
// ]

// const data:Partial<TUser>[] = [
//   {
//     userId: 1,
//     username: 'usuario1',
//     names: 'Juan',
//     lastnames: 'Perez',
//     type: EUserType.admin,
//     email: 'juan.perez@email.com',
//     phone: '123456789'
//   },
//   {
//     userId: 2,
//     username: 'usuario2',
//     names: 'Carlos',
//     lastnames: 'Ramirez',
//     type: EUserType.admin,
//     email: 'carlos.ramirez@email.com',
//     phone: '123456780'
//   }
// ]

// type MyTableProps<TEntity> = {
//   headerColumns: string[],
//   data: TEntity[],
//   hasButtonNew?: boolean,
//   contentButtonNew?: string,
//   showPagination?: boolean,
//   page: number,
//   totalRows: number,
//   rowsPerPage: number,
//   total: number,
//   onPressButtonNew?: () => never,
//   onChangePage?: () => never,
//   onChangeRowsPerPage?: () => never,
//   onPressDelete?: () => never,
//   onPressEdit?: () => never,
//   onPressView?: () => never,
// }

// function MyTable<TEntity> ({ data, hasButtonNew, contentButtonNew, showPagination, totalRows, page, rowsPerPage, total, onPressButtonNew, onChangePage, onChangeRowsPerPage, onPressDelete, onPressEdit, onPressView } : MyTableProps<TEntity>) {
//   const [selectedKeys, setSelectedKeys] = React.useState(new Set<React.Key>([]))

//   const topContent = React.useMemo(() => {
//     return (
//       <>
//         <div className='flex gap-3 items-center justify-between'>
//           <Input isClearable className='w-[min(100%,400px)]' placeholder='Buscar por usuario' startContent={<Yesicon icon='ri:search-line' />} />
//           <Button color='primary' startContent={<Yesicon icon='ph:plus-bold' />}>{contentButtonNew}</Button>
//         </div>
//         <div className='flex items-center justify-between'>
//           <p>Total <span className='font-medium'>{totalRows}</span> resultados</p>
//           <div className='flex items-center gap-2'>
//             <span>Resultados por página</span>
//             <select>
//               <option value='5'>5</option>
//               <option value='10'>10</option>
//               <option value='15'>15</option>
//             </select>
//           </div>
//         </div>
//       </>
//     )
//   }, [])

//   const bottomContent = React.useMemo(() => {
//     return (
//       <>
//         <div className='flex gap-3 items-center justify-between'>
//           <p>{selectedKeys.size} de {totalRows} filas seleccionadas</p>
//           <Pagination showControls total={total} initialPage={1} />
//         </div>
//       </>
//     )
//   }, [])

//   return (
//     <div className='flex-1 p-2'>
//       <h1 className='text-2xl font-medium mb-3'>Usuarios</h1>
//       <Divider />
//       <br />
//       <Table
//         aria-label='Example table with custom cells, pagination and sorting'
//         isHeaderSticky
//         bottomContentPlacement='outside'
//         classNames={{
//           wrapper: 'max-h-[382px]'
//         }}
//         selectedKeys={selectedKeys}
//         selectionMode='multiple'
//         // sortDescriptor={sortDescriptor}
//         topContent={topContent}
//         bottomContent={bottomContent}
//         topContentPlacement='outside'
//         onSelectionChange={setSelectedKeys}
//         // onSortChange={() = >{}}
//       >
//         <TableHeader columns={headerColumns}>
//           {(column) => (
//             <TableColumn
//               className='uppercase'
//               key={column.id}
//               align={column.id === 'actions' ? 'center' : 'start'}
//               allowsSorting={column.sortable}
//             >
//               {column.name}
//             </TableColumn>
//           )}
//         </TableHeader>
//         <TableBody emptyContent='No se econtraron usuarios' items={data}>
//           {(item) => (
//             <TableRow key={item.userId}>
//               <TableCell>{item.username}</TableCell>
//               <TableCell>{item.names}</TableCell>
//               <TableCell>{item.lastnames}</TableCell>
//               <TableCell><Chip variant='flat' color={item.type === EUserType.admin ? 'success' : item.type === EUserType.superadmin ? 'secondary' : 'warning'}>{item.type}</Chip></TableCell>
//               <TableCell>{item.email}</TableCell>
//               <TableCell>{item.phone}</TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }
// export default MyTable
