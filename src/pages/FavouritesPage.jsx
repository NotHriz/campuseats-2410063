import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function FavouritesPage() {
  const { favourites, toggleFavourite } = useCart()
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />
  }

  const favouriteItems = vendors
    .flatMap((vendor) => vendor.menu)
    .filter((item) => favourites.includes(item.id))

  return (
    <>
      <h2 className="section-title">My favourites</h2>

      {favouriteItems.length === 0 ? (
        <section className="card">
          <p>No favourites yet. Favourite an item from a vendor’s menu.</p>
          <Link to="/">Browse vendors</Link>
        </section>
      ) : (
        <MenuList
          items={favouriteItems}
          favourites={favourites}
          onToggleFavourite={toggleFavourite}
        />
      )}
    </>
  )
}

export default FavouritesPage