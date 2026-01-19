import './BestDeal.css';

export default function BestDeal({ bestDeal }) {
  if (!bestDeal) return null;

  return (
    <div className="bestDealSection">
      <div className="productdetails">
        <span className="smartdeallabel">Smart Deal!</span>

        <h2 className="productTitle">{bestDeal.productName}</h2>

        <p className="productPrice">₹{bestDeal.price}</p>

        <div className="bestDealTag">
          Best Overall Deal: {bestDeal.platformName}
        </div>

        <p style={{ marginTop: "8px" }}>
          ⭐ {bestDeal.rating}/5 · {bestDeal.discount}% OFF
        </p>
      </div>

      <div className="productImageContainer">
        <img
          src="https://placehold.co/180x180/0f0f0f/fff?text=Product"
          alt={bestDeal.productName}
          className="productImage"
        />
      </div>
    </div>
  );
}
