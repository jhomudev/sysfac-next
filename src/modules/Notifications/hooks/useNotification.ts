import { formatProductWithQuantity } from '@/adapters'
import ROUTES from '@/app/routes'
import { useCart, useCartPurchase } from '@/hooks'
import { fetcher } from '@/libs/swr'
import { ApiResponseWithReturn, ProductWithQuantityFromDB } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

type Notification = {
  key: string,
  label: string,
  image: string,
  description: string,
  handle: () => void
}

function useNotification () {
  const [notifications, setNotifications] = React.useState([] as Notification[])
  const { push } = useRouter()

  const { cart: { items }, setShowCart } = useCart()
  const { cartPurchase: { items: itemsInPurchase } } = useCartPurchase()
  const hasItemsInCart = items.length > 0
  const hasItemsInCartPurchase = itemsInPurchase.length > 0

  const { data, error, isLoading } = useSWR<ApiResponseWithReturn<ProductWithQuantityFromDB[]>>('/api/products/amounths', fetcher)
  if (error) console.log('No se pudo cargar los productos (amounths)', error)
  const products = React.useMemo(() => data?.data.map(prod => formatProductWithQuantity(prod)) || [], [data])

  React.useEffect(() => {
    setNotifications([])
    if (hasItemsInCart) {
      setNotifications(prev => [...prev, {
        key: crypto.randomUUID(),
        label: 'Venta inconclusa',
        image: 'https://cdn-icons-png.flaticon.com/512/5408/5408490.png',
        description: 'Hay productos en el carrito de ventas, Realice la venta o elimine los productos del carrito.',
        handle: () => setShowCart(true)
      }])
    }
    if (hasItemsInCartPurchase) {
      setNotifications(prev => [...prev, {
        key: crypto.randomUUID(),
        label: 'Compra inconclusa',
        image: 'https://cdn-icons-png.flaticon.com/512/3847/3847867.png',
        description: 'Hay productos en el carrito de compras. Realice la compra o cancelela.',
        handle: () => push(`${ROUTES.purchases}/new`)
      }])
    }

    !isLoading && products.forEach((prod, i) => {
      if (i > 10) return
      if (prod.quantity === 0) {
        setNotifications(prev => [
          ...prev,
          {
            key: crypto.randomUUID(),
            label: 'Producto agotado',
            image: 'https://cdn-icons-png.flaticon.com/512/5166/5166939.png',
            description: `El producto "${prod.name}" no tiene unidades en el inventario. Realize un abastecimiento de este producto.`,
            handle: () => push(`${ROUTES.inventary}?inv.productId=${prod.id}`)
          }
        ])
      } else if (prod.quantity <= prod.inventaryMin + 5) {
        setNotifications(prev =>
          [...prev,
            {
              key: crypto.randomUUID(),
              label: 'Producto por agotarse',
              image: 'https://cdn-icons-png.flaticon.com/512/5166/5166939.png',
              description: `El producto "${prod.name}" tiene pocas unidades en el inventario. Realize un abastecimiento de este producto.`,
              handle: () => push(`${ROUTES.inventary}?inv.productId=${prod.id}`)
            }
          ]
        )
      }
    })
  }, [hasItemsInCart, hasItemsInCartPurchase, push, setShowCart, isLoading, products])

  return {
    notifications
  }
}
export default useNotification
