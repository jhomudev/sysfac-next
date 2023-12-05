/* eslint-disable react/jsx-closing-tag-location */
'use client'
import { Category, ESaleFor, EStateProduct, Product } from '@/types'
import { AutocompleteItem, Autocomplete, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string,
  image: FileList,
  inventaryMin: string,
  priceSale: string,
  unit: string,
  saleFor: string,
  isActive: string,
  categoryId: string
}

type Props = {
  product: Product,
  categoriesPerSelect: Category[]
}

function FormProductEdit ({ product, categoriesPerSelect }: Props) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>()
  const [showModal, setShowModal] = React.useState(false)
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(product.image || '')
  const [categorySelected, setCategorySelected] = React.useState<Category>({} as Category)

  const handleSubmitForm = handleSubmit((data) => {
    // data = { ...data, isActive: data.isActive === EStateProduct.active }
    console.log(data)
    setShowModal(true)
  })

  const handleCreate = () => {
    setShowModal(false)
  }

  return (
    <>
      <form onSubmit={handleSubmitForm} className='flex gap-3 flex-col'>
        <div className='flex gap-3 flex-wrap'>
          <Input
            label='Nombre'
            variant='underlined'
            placeholder='Nombre del producto'
            className='w-full md:max-w-sm'
            color={errors.name ? 'danger' : 'default'}
            defaultValue={product.name}
            errorMessage={errors.name?.message}
            {...register('name', {
              required: {
                value: true,
                message: 'Nombre requerido'
              }
            })}
          />
          <Input
            type='number'
            variant='underlined'
            className='w-full md:max-w-sm'
            label='Precio de venta S/'
            placeholder='Defina el precio'
            defaultValue={product.priceSale.toFixed(2)}
            color={errors.priceSale ? 'danger' : 'default'}
            errorMessage={errors.priceSale?.message}
            {...register('priceSale', {
              required: {
                value: true,
                message: 'Precio requerido'
              },
              pattern: {
                value: /^(\d+)(\.\d{1,2})?$/,
                message: 'Costo inválido'
              },
              setValueAs: (v) => parseFloat(v)
            })}
          />
          <Input
            type='number'
            variant='underlined'
            className='w-full md:max-w-sm'
            label='Mínimo en inventario'
            placeholder='Cantidad mínima'
            defaultValue={product.inventaryMin.toFixed(2)}
            color={errors.inventaryMin ? 'danger' : 'default'}
            errorMessage={errors.inventaryMin?.message}
            {...register('inventaryMin', {
              required: {
                value: true,
                message: 'Mínimo requerido'
              },
              valueAsNumber: true
            })}
          />
          <Input
            className='w-full md:max-w-sm'
            variant='underlined'
            label='Unidad'
            placeholder='Unidad de venta'
            defaultValue={product.unit}
            color={errors.unit ? 'danger' : 'default'}
            errorMessage={errors.unit?.message}
            {...register('unit', {
              required: {
                value: true,
                message: 'Unidad requerida'
              },
              validate: (v) => isNaN(Number(v)) ? true : 'Unidad inválida'
            })}
          />
          <Select
            className='w-full md:max-w-sm'
            variant='underlined'
            label='Venta por:'
            placeholder='Venta por'
            color={errors.saleFor ? 'danger' : 'default'}
            errorMessage={errors.saleFor?.message}
            defaultSelectedKeys={[product.saleFor]}
            {...register('saleFor', {
              required: {
                value: true,
                message: 'Seleccione una opcíon'
              },
              validate: (v) => {
                const isOptionSaleFor = v === ESaleFor.quantity || v === ESaleFor.unit
                return isOptionSaleFor ? true : 'Entrada inválida'
              }
            })}
          >
            <SelectItem key={ESaleFor.quantity} value={ESaleFor.quantity}>{ESaleFor.quantity}</SelectItem>
            <SelectItem key={ESaleFor.unit} value={ESaleFor.unit}>{ESaleFor.unit}</SelectItem>
          </Select>
          <Select
            className='w-full md:max-w-sm'
            variant='underlined'
            label='Estado'
            placeholder='Indique el estado'
            color={errors.isActive ? 'danger' : 'default'}
            errorMessage={errors.isActive?.message}
            defaultSelectedKeys={[product.isActive ? EStateProduct.active : EStateProduct.inactive]}
            {...register('isActive', {
              required: {
                value: true,
                message: 'Seleccione una opcíon'
              },
              validate: (v) => {
                const isOptionStateProduct = Object.values(EStateProduct).includes(v as EStateProduct)
                return isOptionStateProduct ? true : 'Entrada inválida'
              }
            })}
          >
            <SelectItem key={EStateProduct.active} value={EStateProduct.active}>{EStateProduct.active}</SelectItem>
            <SelectItem key={EStateProduct.inactive} value={EStateProduct.inactive}>{EStateProduct.inactive}</SelectItem>
          </Select>
          <Autocomplete
            className='w-full md:max-w-sm'
            variant='underlined'
            label='Categoría'
            placeholder='Seleccione la categoría'
            color={errors.categoryId ? 'danger' : 'default'}
            errorMessage={errors.categoryId?.message}
            defaultItems={categoriesPerSelect}
            defaultSelectedKey={product.category.id.toString()}
            onSelectionChange={(key) => {
              const cat = categoriesPerSelect.find(cat => cat.id === Number(key))
              setCategorySelected(prev => cat ?? prev)
            }}
            {...register('categoryId', {
              required: {
                value: true,
                message: 'Seleccione una opcíon'
              },
              validate: (v) => {
                const isOptionCategory = categoriesPerSelect.some(cat => cat.id === categorySelected.id)
                return isOptionCategory ? true : 'Entrada inválida'
              },
              setValueAs: () => categorySelected.id
            })}
          >
            {
              (cat) => (
                <AutocompleteItem key={cat.id} value={cat.id}>{cat.name}</AutocompleteItem>
              )
            }
          </Autocomplete>
          <div className={`relative grid place-items-center w-full h-40 rounded-md border-2  ${errors.image ? 'border-danger' : 'border-default'}  border-dashed bg-default-50`}>
            <label
              onDrop={(e) => {
                e.preventDefault()
                const image = e.dataTransfer.files
                setValue('image', image)
                const imageURL = URL.createObjectURL(image[0])
                setImagePreviewUrl(imageURL)
              }}
              onDragOver={(e) => {
                e.preventDefault()
              }}
              className='cursor-pointer absolute z-20 w-full h-full top-0 left-0'
            >
              <input
                className='hidden'
                type='file'
                accept='image/*'
                {...register('image', {
                  required: true,
                  onChange: (e:React.ChangeEvent<HTMLInputElement>) => {
                    const imageURL = URL.createObjectURL(e.target.files![0])
                    setImagePreviewUrl(imageURL)
                  }
                })}
              />
            </label>
            {
              imagePreviewUrl
                ? <picture className='relative w-[min(100%,300px)] h-[90%]'>
                  <img
                    className='absolute z-10 w-full h-full object-contain'
                    src={imagePreviewUrl}
                    alt='category'
                  />
                </picture>
                : <p className='text-default'>Click o arrastre aquí la imagen</p>
            }
          </div>
          {!!errors.image && <small className='text-danger text-xs -mt-3'>Seleccione una imagen</small>}
        </div>
        <Button type='submit' color='primary' className='w-full md:w-min'>Actualizar producto</Button>
      </form>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>¿Está seguro de actualizar los datos del producto?</p>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button color='primary' onPress={handleCreate}>
                  Actualizar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default FormProductEdit
