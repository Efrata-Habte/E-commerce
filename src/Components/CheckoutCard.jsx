import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

export default function CheckoutCard({ cart, deliveryOptions }) {
  const { updateDeliveryOption, removeFromCart, updateQuantity } = useCart();
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const [editQuantity, setEditQuantity] = useState(cart.quantity);

  const formatDate = (daysFromNow) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDeliveryChange = (deliveryOptionId) => {
    updateDeliveryOption(cart.productId, deliveryOptionId);
  };

  const handleDelete = () => {
    removeFromCart(cart.productId);
  };

  const handleUpdateClick = () => {
    if (isEditingQuantity) {
      updateQuantity(cart.productId, editQuantity);
    }
    setIsEditingQuantity(!isEditingQuantity);
  };

  const selectedDelivery = deliveryOptions.find(d => d.id === cart.deliveryOptionId) || deliveryOptions[0];
  const deliveryDate = selectedDelivery ? formatDate(selectedDelivery.deliveryDays) : 'No delivery option';
  return (
    <div className="border border-zinc-300 p-5 rounded-xl mb-3 mt-4 w-[700px]">
      <div className="text-green-600 font-bold text-[20px] mt-[5px] mb-5">
        Delivery date: {deliveryDate}
      </div>

      <div className="grid grid-cols-[100px_1fr_1fr] gap-x-[30px]">
        <img
          className="w-[150px] h-[120px] mx-auto block"
          src={cart.productImage}
          alt={cart.productName}
        />

        <div className="cart-item-details">
          <div className="product-name font-semibold text-[18px]">
            {cart.productName}
          </div>
          <div className="product-price text-gray-700 mb-1">
            ${(cart.priceCents / 100).toFixed(2)}
          </div>
          <div className="link-primary mx-[3px]">
            <span>
              Quantity:{" "}
              {isEditingQuantity ? (
                <input
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(Number(e.target.value))}
                  className="w-12 text-center border border-gray-300 rounded"
                  min="1"
                />
              ) : (
                <span className="quantity-label font-medium">{cart.quantity}</span>
              )}
            </span>
            <button onClick={handleUpdateClick} className="update-quantity-link text-green-600 px-2">
              {isEditingQuantity ? 'Save' : 'Update'}
            </button>
            <button onClick={handleDelete} className="delete-quantity-link text-green-600 ">
              Delete
            </button>
          </div>
        </div>

        <div className="delivery-options">
          <div className="delivery-options-title font-medium mb-2">
            Choose a delivery option:
          </div>

          {deliveryOptions.map(option => (
            <div key={option.id} className="delivery-option flex items-start gap-2 mb-2">
              <input
                type="radio"
                checked={cart.deliveryOptionId === option.id}
                onChange={() => handleDeliveryChange(option.id)}
                className="delivery-option-input mt-1"
                name={`delivery-option-${cart.productId}`}
              />
              <div>
                <div className="delivery-option-date font-semibold">
                  {formatDate(option.deliveryDays)}
                </div>
                <div className="delivery-option-price text-gray-700">
                  {option.priceCents === 0 ? 'FREE Shipping' : `$${(option.priceCents / 100).toFixed(2)} - Shipping`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

