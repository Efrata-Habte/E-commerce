
export default function OrdersCard({p}){
    return (
        <>
           <div className="product-image-container">
              <img src={p.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {p.products.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: August 15
              </div>
              <div className="product-quantity">
                {p.products.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <a href="tracking.html">
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div> 
        </>
    );
}