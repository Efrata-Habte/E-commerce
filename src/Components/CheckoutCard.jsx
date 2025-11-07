export default function CheckoutCard({ cart }) {
  return (
    <div className="border border-zinc-300 p-5 rounded-xl mb-3 mt-4 w-[700px]">
      <div className="text-green-600 font-bold text-[20px] mt-[5px] mb-5">
        Delivery date: Tuesday, June 21
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
              <span className="quantity-label font-medium">{cart.quantity}</span>
            </span>
            <button className="update-quantity-link text-green-600 px-2">
              Update
            </button>
            <button className="delete-quantity-link text-green-600 ">
              Delete
            </button>
          </div>
        </div>

        <div className="delivery-options">
          <div className="delivery-options-title font-medium mb-2">
            Choose a delivery option:
          </div>

          <div className="delivery-option flex items-start gap-2 mb-2">
            <input
              type="radio"
              defaultChecked
              className="delivery-option-input mt-1"
              name="delivery-option-1"
            />
            <div>
              <div className="delivery-option-date font-semibold">
                Tuesday, June 21
              </div>
              <div className="delivery-option-price text-gray-700">
                FREE Shipping
              </div>
            </div>
          </div>

          <div className="delivery-option flex items-start gap-2 mb-2">
            <input
              type="radio"
              className="delivery-option-input mt-1"
              name="delivery-option-1"
            />
            <div>
              <div className="delivery-option-date font-semibold">
                Wednesday, June 15
              </div>
              <div className="delivery-option-price text-gray-700">
                $4.99 - Shipping
              </div>
            </div>
          </div>

          <div className="delivery-option flex items-start gap-2">
            <input
              type="radio"
              className="delivery-option-input mt-1"
              name="delivery-option-1"
            />
            <div>
              <div className="delivery-option-date font-semibold">
                Monday, June 13
              </div>
              <div className="delivery-option-price text-gray-700">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

