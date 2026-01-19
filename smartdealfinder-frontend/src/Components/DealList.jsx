import VendorDeal from "./VendorDeal";
import "./VendorDeal.css";

export default function DealList({ deals }) {
  if (!deals || deals.length === 0) return null;

  return (
    <div className="DealListSection">
      <div className="DealList">
        {deals.map((deal, index) => (
          <VendorDeal
            key={index}
            vendor={deal.platformName}
            vendorPrice={deal.price}
            vendorRating={deal.rating}
            discount={deal.discount}
          />
        ))}
      </div>
    </div>
  );
}
