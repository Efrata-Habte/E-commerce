import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutCard from "../Components/CheckoutCard";
import Summary from "../Components/Summary";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const [carts, setCarts] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const { cart, placeOrder } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch("/backend/products.json").then(res => res.json()),
      fetch("/backend/deliveryOptions.json").then(res => res.json())
    ])
      .then(([products, deliverys]) => {
        setDeliveryOptions(deliverys);
        const enrichedOrders = cart.map(item => {
          const product = products.find(p => p.id === item.productId);
          const delivery = deliverys.find(d => d.id === item.deliveryOptionId);
          return {
            ...item,
            productName: product ? product.name : "Unknown Product",
            productImage: product ? "/" + product.image : "",
            priceCents: product? product.priceCents: "0",
            deliveryDays: delivery ? delivery.deliveryDays : "no day",
            deliveryPriceCents: delivery ? delivery.priceCents : 0
          };
        });

        setCarts(enrichedOrders);
      })
      .catch(err => console.error("Error loading data:", err));
  }, [cart]);

  const handlePlaceOrder = async () => {
    await placeOrder();
    navigate('/orders');
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-start py-10">
        <div className="grid grid-cols-[1fr_800px] gap-5 max-w-[1150px] w-full">
          <div>
            <div className="font-bold mb-[25px] text-2xl">Your Cart</div>
            <div className="space-y-4">
              {carts.map((c) => (
              <CheckoutCard key={c.productId} cart={c} deliveryOptions={deliveryOptions} />
              ))}
            </div>
          </div>
          <div className="self-start">
            <Summary cart={carts} onPlaceOrder={handlePlaceOrder} />
          </div>
      </div>
      </div>      
    </>
  );
}
