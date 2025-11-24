import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Tracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided");
      setLoading(false);
      return;
    }

    Promise.all([
      fetch("/backend/products.json").then(res => res.json()),
      fetch("/backend/orders.json").then(res => res.json())
    ])
      .then(([products, ordersData]) => {
        const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const allOrders = [...localOrders, ...ordersData];
        const foundOrder = allOrders.find(order => order.id === orderId);

        if (!foundOrder) {
          setError("Order not found");
          setLoading(false);
          return;
        }

        const enrichedOrder = {
           ...foundOrder,
           orderTimeMs: Date.now() - 86400000, // 1 day ago
           products: foundOrder.products.map(item => {
             const product = products.find(p => p.id === item.productId);
             return {
               ...item,
               productName: product ? product.name : "Unknown Product",
               productImage: product ? "/" + product.image : "",
               estimatedDeliveryTimeMs: Date.now() + 5 * 24 * 60 * 60 * 1000 // 5 days from now
             };
           })
         };

        setOrder(enrichedOrder);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading data:", err);
        setError("Failed to load order data");
        setLoading(false);
      });
  }, [orderId]);

  const getTrackingStatus = (orderTime, deliveryTime) => {
    const now = Date.now();
    const orderDate = new Date(orderTime);
    const deliveryDate = new Date(deliveryTime);

    if (now < orderDate.getTime() + 86400000) { // Within 24 hours of order
      return { status: "Ordered", progress: 25 };
    } else if (now < deliveryDate.getTime() - 172800000) { // 2 days before delivery
      return { status: "Shipped", progress: 50 };
    } else if (now < deliveryDate.getTime()) { // Before delivery date
      return { status: "Out for Delivery", progress: 75 };
    } else {
      return { status: "Delivered", progress: 100 };
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="max-w-[850px] mt-[50px] mb-[100px] mx-auto">
        <div className="text-center">Loading tracking information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[850px] mt-[50px] mb-[100px] mx-auto">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-[850px] mt-[50px] mb-[100px] mx-auto">
        <div className="text-center">Order not found</div>
      </div>
    );
  }

  const trackingInfo = getTrackingStatus(order.orderTimeMs, order.products[0].estimatedDeliveryTimeMs);

  return (
    <div className="max-w-[850px] mt-[50px] mb-[100px] mx-auto">
      <div className="font-bold mb-[25px] text-2xl">Track Your Order</div>

      {/* Order Summary */}
      <div className="bg-white border border-zinc-400 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="font-bold text-lg">Order #{order.id.slice(-8)}</div>
            <div className="text-gray-600">Ordered on {formatDate(order.orderTimeMs)}</div>
          </div>
          <div className="text-right">
            <div className="font-bold">${(order.totalCostCents / 100).toFixed(2)}</div>
            <div className="text-gray-600">{order.products.length} item{order.products.length > 1 ? 's' : ''}</div>
          </div>
        </div>
      </div>

      {/* Tracking Status */}
      <div className="bg-white border border-zinc-400 p-6 mb-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="font-bold text-lg">Status: {trackingInfo.status}</div>
            <div className="text-sm text-gray-600">{trackingInfo.progress}% Complete</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${trackingInfo.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="space-y-4">
          <div className={`flex items-center ${trackingInfo.progress >= 25 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-4 h-4 rounded-full mr-3 ${trackingInfo.progress >= 25 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div>
              <div className="font-medium">Ordered</div>
              <div className="text-sm">{formatDate(order.orderTimeMs)}</div>
            </div>
          </div>

          <div className={`flex items-center ${trackingInfo.progress >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-4 h-4 rounded-full mr-3 ${trackingInfo.progress >= 50 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div>
              <div className="font-medium">Shipped</div>
              <div className="text-sm">Package has left the warehouse</div>
            </div>
          </div>

          <div className={`flex items-center ${trackingInfo.progress >= 75 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-4 h-4 rounded-full mr-3 ${trackingInfo.progress >= 75 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div>
              <div className="font-medium">Out for Delivery</div>
              <div className="text-sm">Package is on its way to you</div>
            </div>
          </div>

          <div className={`flex items-center ${trackingInfo.progress >= 100 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-4 h-4 rounded-full mr-3 ${trackingInfo.progress >= 100 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div>
              <div className="font-medium">Delivered</div>
              <div className="text-sm">Estimated: {formatDate(order.products[0].estimatedDeliveryTimeMs)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white border border-zinc-400 p-6">
        <div className="font-bold text-lg mb-4">Order Items</div>
        <div className="space-y-4">
          {order.products.map((product) => (
            <div key={product.productId} className="flex items-center border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-16 h-16 object-cover mr-4 rounded"
              />
              <div className="flex-1">
                <div className="font-medium">{product.productName}</div>
                <div className="text-sm text-gray-600">Quantity: {product.quantity}</div>
                <div className="text-sm text-gray-600">Estimated Delivery: {formatDate(product.estimatedDeliveryTimeMs)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}