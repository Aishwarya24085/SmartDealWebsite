import './BestDeal.css';

export default function BestDeal({ bestDeal }) {
  if (!bestDeal) return null;

  const discountedPrice = Math.round(
    bestDeal.price - (bestDeal.price * bestDeal.discount) / 100
  );

  return (
    <div className="best-deal-card">
      <div className="deal-badge">
        <span className="badge-icon"></span> SMART DEAL
      </div>
      
      <div className="deal-content">
        <div className="deal-info">
          <h2 className="product-title">{bestDeal.productName}</h2>
          
          <div className="rating-row">
            <span className="stars">{"★".repeat(Math.floor(bestDeal.rating))}</span>
            <span className="rating-score">{bestDeal.rating} / 5</span>
            <span className="platform-tag">on {bestDeal.platformName}</span>
          </div>

          <div className="price-container">
            <span className="current-price">₹{discountedPrice.toLocaleString()}</span>
            <span className="mrp">₹{bestDeal.price.toLocaleString()}</span>
            <span className="discount-pill">{bestDeal.discount}% OFF</span>
          </div>

          <div className="seller-details">
            <p>Sold by: <strong>{bestDeal.seller}</strong></p>
            <div className="seller-trust-bar">
               <div className="trust-fill" style={{width: `${(bestDeal.sellerRating/5)*100}%`}}></div>
            </div>
            <span>Seller Rating: {bestDeal.sellerRating}/5</span>
          </div>
          
          <a
            href={bestDeal.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="view-deal-btn"
          >
            View Best Deal
          </a>
        </div>

        <div className="image-wrapper">
          {bestDeal.image && (
            <img src={bestDeal.image} alt={bestDeal.productName} className="main-img" />
          )}
        </div>
      </div>
    </div>
  );
}