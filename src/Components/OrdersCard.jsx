import { Link } from "react-router-dom";

export default function OrdersCard({ p }) {
  return (
    <div className="order-container">
      <div className="bg-white border-red flex items-center justify-between px-[25px] py-5 border-t-5  ">
        <div className="flex shrink-0">
          <div className="mr-[45px]">
            <div className="font-bold">Order Placed:</div>
            <div >August 12</div>
          </div>
          <div className="mr-[45px]">
            <div className="font-bold">Total:</div>
            <div>${(p.totalCostCents / 100).toFixed(2)}</div>
          </div>
        </div>

        <div className="flex shrink">
          <div className="font-bold">Order ID:</div>
          <div>{p.id}</div>
        </div>
      </div>

      <div className="px-[25px] py-10 border-e-indigo-100 border-t-0 rounded-b-[5px] grid [grid-template-columns: 110px_1fr_220px] gap-y-15 items-center ">
        {p.products.map((product) => (
          <div key={product.productId} className="product-section">
            <div className="text-center">
              <img src={product.productImage} alt={product.productName} className="max-w-[110px] max-h-[110px]"/>
            </div>

            <div className="product-details">
              <div className="font-bold mb-[5px]">{product.productName}</div>
              <div className="mb-[3px]">
                Arriving on: August 15
              </div>
              <div className="mb-2">
                Quantity: {product.quantity}
              </div>
              <button className="text-base w-[140px] h-9 rounded-[5px] flex items-center justify-center ">
                <img
                  className="w-5 mr-2.5"
                  src="/images/icons/buy-again.png"
                  alt="Buy again"
                />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="grid-col-auto mb-[70px]">
              <Link to="/tracking">
                <button className="w-full p-3 button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
