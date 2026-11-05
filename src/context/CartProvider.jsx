import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  const [favourites, setFavourites] = useLocalStorage(
  'campuseats-favourites',
  []
  )

  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  )

  function addToCart(item) {
    setCart((previous) => {
      const existing = previous.find((line) => line.item.id === item.id)

      if (existing) {
        return previous.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...previous, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((previous) =>
      previous
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function removeFromCart(itemId) {
    setCart((previous) =>
      previous.filter((line) => line.item.id !== itemId)
    )
  }

  function placeOrder(details) {
    if (cart.length === 0) return

    const order = {
      ...details,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      items: cart,
      total,
    }

    setOrders((previous) => [order, ...previous])
    setCart([])
  }

  function toggleFavourite(itemId) {
    setFavourites((previous) =>
      previous.includes(itemId)
        ? previous.filter((id) => id !== itemId)
        : [...previous, itemId]
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        count,
        total,
        addToCart,
        changeQty,
        removeFromCart,
        placeOrder,
        favourites,
        toggleFavourite,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}