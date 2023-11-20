/* eslint-disable no-unused-vars */
import { useQuote } from "./contexts/QuoteContext";

function Result() {
  const { shipmentDetails, weight } = useQuote();

  const summary = shipmentDetails?.map(
    (detail) =>
      (detail.lengthOf * detail.width * detail.hight * detail.units) / 6000
  );
  const total = summary?.reduce(
    (total, currentItem) =>
      (total = Number(total) + Number(currentItem) || 0).toFixed(2),
    0
  );

  const chargeableWeight =
    total > weight
      ? Number(total || 0).toFixed(2)
      : Number(weight || 0).toFixed(2);

  return (
    <div>
      <p className="chargeableWeight mx-2">{`${chargeableWeight || 0} Kg`}</p>
    </div>
  );
}

export default Result;
