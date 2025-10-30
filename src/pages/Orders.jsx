import { useState, useEffect } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/backend/products.json").then(res => res.json()),
      fetch("/backend/orders.json").then(res => res.json())
    ])
      .then(([products, ordersData]) => { 
        const enrichedOrders = ordersData.map(order => ({
          ...order,
          products: order.products.map(item => {
            const product = products.find(p => p.id === item.productId);
            return {
              ...item,
              productName: product ? product.name : "Unknown Product" 
            };
          })
        }));

        setOrders(enrichedOrders); 
      })
      .catch(err => console.error("Error loading data:", err));
  }, []);

  return (
    <div>
      {orders.map(order => (
        <div key={order.id} className="mb-4 border-b border-gray-400 pb-2">
          <h3>Order ID: {order.id}</h3>
          <ul>
            {order.products.map(p => (
              <li key={p.productId}>
                {p.productName} — Qty: {p.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
