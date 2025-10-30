import { Link } from "react-router-dom";

export default function OrdersCard({p}){
    return (
        <>
           {p.products.map(product => (
             <div key={product.productId} className="order-item">
               <div className="product-image-container">
                 <img src={product.productImage} />
               </div>

               <div className="product-details">
                 <div className="product-name">
                   {product.productName}
                 </div>
                 <div className="product-delivery-date">
                   Arriving on: August 15
                 </div>
                 <div className="product-quantity">
                   Quantity: {product.quantity}
                 </div>
                 <button className="buy-again-button button-primary">
                   <img className="buy-again-icon" src="/images/icons/buy-again.png" />
                   <span className="buy-again-message">Add to Cart</span>
                 </button>
               </div>
             </div>
           ))}

           <div className="product-actions">
             <Link to="/tracking">
               <button className="track-package-button button-secondary">
                 Track package
               </button>
             </Link>
           </div>
        </>
    );
}