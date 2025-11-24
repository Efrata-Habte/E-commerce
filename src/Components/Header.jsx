import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Header({ children }) {
  const { cart, searchQuery, setSearchQuery } = useCart();
  return (
    <>
      <div className="bg-green-900 flex items-center justify-between  px-[15px] inset-0 text-white fixed h-16">
        <div className="w-52 md:w-auto">
            <Link to="/" className="inline-block px-[9.5px] py-1.5 rounded-sm cursor-pointer no-underline border-solid hover:border border-white">
                <img src="/images/logo-white.png" alt="Logo" className="hidden md:block h-[26px] my-px" />
                <img src="/images/mobile-logo-white.png" alt="Mobile Logo" className="block md:hidden h-[26px] my-px" />
            </Link>
        </div>

        <div className="flex-1 max-w[850px] ml-20 flex bg-white rounded-[10px]">
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 w-0 text-base h-[38px] px-4 rounded-l-md rounded-r-none text-black" type="text" placeholder="Search" />
            <button className="bg-emerald-200 w-[45px] h-10 rounded-r-md shrink-0">
            <img className="h-5 ml-2.5 mt-[3px]" src="/images/icons/search-icon.png" />
            </button>
      </div>

      <div className="w-[200px] shrink-0 flex justify-end mr-7.5">
            <Link className="text-white flex items-center px-[9.5px] py-1.5 rounded-sm cursor-pointer no-underline border border-transparent hover:border-white" to="/orders">

            <span className="block text-base font-bold">Orders</span>
            </Link>

            <Link className="text-white flex items-center relative px-[9.5px] py-1.5 rounded-sm cursor-pointer no-underline border-solid hover:border border-white" to="/checkout">
            <img className="w-[38px]" src="/images/icons/cart-icon.png" />
            <div className="text-green-900 text-base font-bold absolute top-[4.5px] right-[50px] w-[26px] text-center">{cart.length}</div>
            <div className="ml-[5px] text-base font-bold">Cart</div>
            </Link>
      </div>
    </div>
    {children}
    </>
  );
}
