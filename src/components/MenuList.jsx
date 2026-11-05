import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'

function MenuList({ items, favourites, onToggleFavourite }) {
  const { addToCart } = useCart()
  if (items.length === 0) {
    return <p className="muted">No items match this view</p>
  }

  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} onAdd={addToCart} isFavourite={favourites.includes(item.id)} onToggleFavourite={onToggleFavourite} />
      ))}
    </div>
  )
}

export default MenuList