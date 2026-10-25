import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import CartPage from './components/CartPage.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  const [cart, setCart] = useState([])
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)
  const [view, setView] = useState('menu')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [lastOrder, setLastOrder] = useState(null)

  useEffect(() => {
  const controller = new AbortController()

  async function loadVendors() {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/vendors.json', {
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      if (!controller.signal.aborted) {
        setVendors(data)
        setSelectedVendorId(data[0]?.id ?? null)
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err.message)
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false)
      }
    }
  }

  loadVendors()

  return () => controller.abort()
}, [reloadKey])


  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existingLine = prevCart.find((line) => line.item.id === item.id)
      if (existingLine) {
        // Item already in cart; increase quantity
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      // Item not in cart; add new line
      return [...prevCart, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) => {
      return prevCart.map((line) => {
        if (line.item.id === itemId) {
          const newQty = line.qty + delta
          if (newQty <= 0) return null // remove this line
          return { ...line, qty: newQty }
        }
        return line
      }).filter(Boolean) // remove nulls
    }
  )
  }

  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  function handlePlaceOrder(details) {
  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  )

  setLastOrder({ ...details, total })
  setCart([])
  setView('done')
}
  
  let content
  if (view === 'cart') {
    content = (
      <CartPage cart={cart} onChangeQty={handleChangeQty}
                onRemove={handleRemove} onPlaceOrder={handlePlaceOrder} />
    )
  } else if (view === 'done') {
    content = (
      <section className="card">
        <h2>Order placed.</h2>
        <p>Thank you, {lastOrder.name}!</p>
        <p>Pickup time: {lastOrder.pickupTime}</p>
        <p>Total: RM {lastOrder.total.toFixed(2)}</p>
      </section>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((k) => k + 1)}
      />
    )
  } else if (!selectedVendor) {
    content = <p>No vendors available.</p>
  } else {
    content = (
      <>
        <main className="container">
            <h2 className="section-title">Choose a vendor</h2>
            <div className="vendor-grid">
              {vendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  isSelected={vendor.id === selectedVendorId}
                  onSelect={setSelectedVendorId}
                />
              ))}
            </div>
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        </main>
        <Footer />
      </>
  )
} 
return (
    <>
      <Header cartCount={cartCount}
              onShowMenu={() => setView('menu')} onShowCart={() => setView('cart')} />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}
 
export default App
