import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useCart } from '../hooks/useCart.js'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()

  const { favourites, toggleFavourite } = useCart()
  const [favouritesOnly, setFavouritesOnly] = useState(false)

  const vendor = vendors.find((vendor) => vendor.id === id)

  if (loading) return <Loading />

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />
  }

  if (!vendor) {
    return (
      <section className="card">
        <h2>Vendor not found</h2>
        <Link to="/">Back to vendors</Link>
      </section>
    )
  }

  const visibleItems = vendor.menu.filter(
    (item) => !favouritesOnly || favourites.includes(item.id)
  )

  return (
    <>
      <Link to="/">Back to vendors</Link>

      <h2 className="section-title">Menu: {vendor.name}</h2>
      <p className="muted">{vendor.location}</p>
      <p className="muted">Open: {vendor.openHours}</p>

      <label>
        <input
          type="checkbox"
          checked={favouritesOnly}
          onChange={(event) => setFavouritesOnly(event.target.checked)}
        />
        Favourites only
      </label>

      <MenuList
        items={visibleItems}
        favourites={favourites}
        onToggleFavourite={toggleFavourite}
      />
    </>
  )
}

export default VendorPage