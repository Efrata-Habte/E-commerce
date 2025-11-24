import { useState } from 'react';

export default function Summary({ cart, onPlaceOrder }) {
    const [placing, setPlacing] = useState(false);

    const itemsCount = cart.length;
    const subtotal = cart.reduce((total, item) => total + (item.priceCents * item.quantity) / 100, 0);
    const shipping = 4.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const handlePlaceOrder = async () => {
        setPlacing(true);
        try {
            await onPlaceOrder();
        } finally {
            setPlacing(false);
        }
    };

    return(
        <>
            <div className="border border-zinc-300 rounded-2xl p-5 w-[400px] mt-4">
            <div className="font-bold text-[20px] mb-3">
              Payment Summary
            </div>

            <div className="grid grid-cols-[1fr_auto] text-base mb-2.5">
              <div>Items ({itemsCount}):</div>
              <div className="text-right">${subtotal.toFixed(2)}</div>
            </div>

            <div className="grid grid-cols-[1fr_auto] text-base mb-2.5">
              <div>Shipping & handling:</div>
              <div className="text-right">${shipping.toFixed(2)}</div>
            </div>

            <div className="grid grid-cols-[1fr_auto] text-base mb-2.5 subtotal-row">
              <div>Total before tax:</div>
              <div className="text-right">${(subtotal + shipping).toFixed(2)}</div>
            </div>

            <div className="grid grid-cols-[1fr_auto] text-base mb-2.5 payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="text-right">${tax.toFixed(2)}</div>
            </div>

            <div className="grid grid-cols-[1fr_auto] text-base mb-2.5 total-row">
              <div>Order total:</div>
              <div className="text-right">${total.toFixed(2)}</div>
            </div>

            <button
                onClick={handlePlaceOrder}
                disabled={placing || cart.length === 0}
                className="w-full py-3 rounded button-primary disabled:opacity-50"
            >
              {placing ? 'Placing Order...' : 'Place your order'}
            </button>
            </div>
        </>
    );
}