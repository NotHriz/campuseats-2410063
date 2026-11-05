import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <section className="card">
        <h2>No orders yet</h2>
        <Link to="/">Browse vendors</Link>
      </section>
    )
  }

  return (
    <>
      <h2 className="section-title">My orders</h2>

      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <h3>Order for {order.name}</h3>
            <p>Mahallah: {order.mahallah}</p>
            <p>Pickup time: {order.pickupTime}</p>
            <p className="muted">
              Placed: {new Date(order.createdAt).toLocaleString()}
            </p>

            <ul>
              {order.items.map(({ item, qty }) => (
                <li key={item.id}>
                  {item.name} × {qty} — RM {(item.price * qty).toFixed(2)}
                </li>
              ))}
            </ul>

            <p className="price">Total: RM {order.total.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default OrdersPage