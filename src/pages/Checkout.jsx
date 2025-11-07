import { useState, useEffect } from "react";
import CheckoutCard from "../Components/CheckoutCard";
import Summary from "../Components/Summary";

export default function Checkout() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/backend/products.json").then(res => res.json()),
      fetch("/backend/cart.json").then(res => res.json()),
      fetch("/backend/deliveryOptions.json").then(res => res.json())
    ])
      .then(([products, cartsData, deliverys]) => { 
        const enrichedOrders = cartsData.map(item => {
          const product = products.find(p => p.id === item.productId);
          const delivery = deliverys.find(d => d.id === item.deliveryOptionId);
          return {
            ...item,
            productName: product ? product.name : "Unknown Product",
            productImage: product ? product.image : "no Image",
            priceCents: product? product.priceCents: "0",
            deliveryDays: delivery ? delivery.deliveryDays : "no day",
            deliveryPriceCents: delivery ? delivery.priceCents : 0
          };
        });

        setCarts(enrichedOrders);
      })
      .catch(err => console.error("Error loading data:", err));
  }, []);

  return (
    <>
    <div className="grid grid-cols-[1fr_400px] items-start">
      <div className="space-y-4">
        {carts.map((c) => (
        <CheckoutCard key={c.productId} cart={c} />
        ))}
      </div>

    <Summary cart={carts} />
</div>

      
    </>
  );
}
