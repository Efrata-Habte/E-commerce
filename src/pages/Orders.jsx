import { useState, useEffect } from "react";
import OrdersCard from "../Components/OrdersCard";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/backend/products.json").then(res => res.json()),
      fetch("/backend/orders.json").then(res => res.json())
    ])
      .then(([productsData, ordersData]) => {
        // Combine orders from backend and localStorage
        const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const allOrders = [...localOrders, ...ordersData];

        const enrichedOrders = allOrders.map(order => ({
          ...order,
          products: order.products.map(item => {
            const product = productsData.find(p => p.id === item.productId);
            return {
              ...item,
              productName: product ? product.name : "Unknown Product" ,
              productImage: product ? "/" + product.image : ""
            };
          })
        }));

        setOrders(enrichedOrders);
      })
      .catch(err => console.error("Error loading data:", err));
  }, []);

  return (
        <div className="max-w-[850px] mt-[50px] mb-[100px] mx-auto ">
            <div className="font-bold mb-[25px] text-2xl">Your Orders</div>
            <div className="grid grid-cols-1 gap-y-[50px]">
                {orders.map(pro =>(
                <OrdersCard key={pro.id} p={pro}/>
            ))}
            </div>

        </div>

  );
}
