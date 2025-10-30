import { useState, useEffect } from "react";
import OrdersCard from "../Components/OrdersCard";

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
              productName: product ? product.name : "Unknown Product" ,
              productImage: product? product.image : "no Image"
            };
          })
        }));

        setOrders(enrichedOrders); 
      })
      .catch(err => console.error("Error loading data:", err));
  }, []);

  return (
        <div>
            {orders.map(pro =>(
                <OrdersCard key={pro.id} p={pro}/>
            ))}
        </div>
    
  );
}
