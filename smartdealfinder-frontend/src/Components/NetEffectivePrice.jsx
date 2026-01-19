import './NetEffectivePrice.css';

export default function NetEffectivePrice({ bestDeal }) {
  if (!bestDeal) return null;

  const netPrice = Math.round(
    bestDeal.price - (bestDeal.price * bestDeal.discount) / 100
  );

  return (
    <div className="netPriceContainer">
      <div className="netPriceContent">
        <p className="netPriceTitle">
          Net Effective Price <span className="netPriceSubtitle">(after discount)</span>
        </p>
        <p className="netPriceValue">₹{netPrice}</p>
      </div>
    </div>
  );
}
