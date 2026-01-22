import './VendorDeal.css';

export default function VendorDeal({
  vendor,
  vendorPrice,
  vendorRating,
  discount,
  productUrl,
  seller,
  sellerRating
}) {
  // Calculate the discounted price
  const discountedPrice = Math.round(vendorPrice - (vendorPrice * discount) / 100);

  return (
    <div className="VendorSection">
      <div className="VendorHeader">
        <h3 className="VendorTitle">{vendor}</h3>
        <span className="VendorBadge">{discount}% OFF</span>
      </div>

      <div className="PriceContainer">
        <span className="DiscountedPrice">₹{discountedPrice.toLocaleString()}</span>
        <span className="OriginalPrice">₹{vendorPrice.toLocaleString()}</span>
      </div>

      <div className="RatingRow">
        <span className="RatingItem">⭐ {vendorRating}/5</span>
      </div>

      <div className="SellerInfoBox">
        <p className="SellerName">Seller: <strong>{seller || 'Verified Seller'}</strong></p>
        <p className="SellerRating">Seller Rating: <span>⭐ {sellerRating || '4.0'}/5</span></p>
      </div>

      <a
        href={productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="VendorButton"
      >
        View on {vendor}
      </a>
    </div>
  );
}