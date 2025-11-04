import { Link } from "react-router-dom";

export default function OrdersCard({ p }) {
  return (
    <div className="order-container">
      <div className="bg-white flex items-center justify-between px-[25px] py-5 border border-zinc-400 ">
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

        <div className="flex flex-col shrink">
          <div className="font-bold ">Order ID:</div>
          <div className="">{p.id}</div>
        </div>
      </div>

      <div className="px-[25px] py-10 border-zinc-400 border grid [grid-template-columns: 110px_1fr_220px] gap-y-15 items-center ">
        {p.products.map((product) => (
          <div key={product.productId} className=" grid grid-cols-[150px_1fr_200px] gap-4">
            <div className="text-center">
              <img src={product.productImage} alt={product.productName} className="max-w-[110px] max-h-[110px] "/>
            </div>

            <div className="flex flex-col  ">
              <div className="font-bold mb-[5px]">{product.productName}</div>
              <div className="mb-[3px]">
                Arriving on: August 15
              </div>
              <div className="mb-2">
                Quantity: {product.quantity}
              </div>
              <button className="text-base w-[200px] h-10 rounded-[5px] flex items-center">
                <img
                  className="w-5 mr-2.5"
                  src="/images/icons/buy-again.png"
                  alt="Buy again"
                />
                <span className="buy-again-message button-primary w-[250px] h-[35px] flex items-center justify-center mt-5 -mx-7.5 " >Add to Cart</span>
              </button>
            </div>

            <div className="grid-col-auto mb-[70px]">
              <Link to="/tracking">
                <button className="w-50 p-3 button-secondary">
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
