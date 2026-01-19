import BestDeal from "./BestDeal"
import DealList from "./DealList"

import './BestDeal.css'
import './DealList.css'
import NetEffectivePrice from "./NetEffectivePrice"


export default function Main({ data }) {
  return (
    <>
      <BestDeal bestDeal={data.bestDeal} />
      <DealList deals={data.deals} />
      <NetEffectivePrice bestDeal={data.bestDeal} />
    </>
  );
}
