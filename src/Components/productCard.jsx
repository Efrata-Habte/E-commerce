
export default function ProductCard({ p }) {
  return (
    <div
      className="flex flex-col border border-gray-300 rounded-xl p-5 shadow-sm bg-white transition-all duration-300 hover:shadow-md  hover:border-green-700"
    >
      <div className="flex justify-center items-center h-[180px] mb-4">
        <img
          className="max-w-full max-h-full rounded-md object-contain"
          src={p.image}
          alt={p.name}
        />
      </div>

      <div className="text-center font-semibold text-gray-800 mb-2 line-clamp-2">
        {p.name}
      </div>

      <div className="flex items-center justify-center mb-2 mt-auto">
        <img
          className="w-20 mr-2"
          src={`/images/ratings/rating-${p.rating.stars * 10}.png`}
          alt={`${p.rating.stars} stars`}
        />
        <span className="text-green-700 text-sm">({p.rating.count})</span>
      </div>

      <div className="text-center font-bold text-green-900 text-lg mb-3">
        ${(p.priceCents / 100).toFixed(2)}
      </div>

      <div className="mb-2 flex justify-center">
        <select className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-800">
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="text-green-700 text-base flex items-center justify-center mb-1 opacity-0">
        <img
          src="/images/icons/checkmark.png"
          alt="added"
          className="w-4 mr-1"
        />
        Added
      </div>

      <button className="w-full mt-auto bg-green-900 hover:bg-green-800 text-white py-2 rounded-lg transition-all duration-200">
        Add to Cart
      </button>
    </div>
  );
}

