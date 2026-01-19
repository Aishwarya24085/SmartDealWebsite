import './VendorDeal.css';

export default function VendorDeal({
  vendor,
  vendorPrice,
  vendorRating,
  discount
}) {
  return (
    <div className="VendorSection">
      <div className="VendorDetails">
        <h3>{vendor}</h3>

        <p className="VendorPrice">₹{vendorPrice}</p>
        <p className="VendorRating">⭐ {vendorRating}/5</p>

        {discount > 0 && (
          <p className="VendorDiscount">{discount}% OFF</p>
        )}

        <button className="VendorButton" disabled>
          View Deal
        </button>
      </div>
    </div>
  );
}
