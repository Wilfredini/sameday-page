/* eslint-disable no-unused-vars */
import { useQuote } from "./contexts/QuoteContext";

function Result() {
  const { shipmentDetails, weight, register } = useQuote();

  const summary = shipmentDetails.map((detail) =>
    (detail.lengthOf * detail.width * detail.hight * detail.units) / 6000 >=
    weight
      ? (detail.lengthOf * detail.width * detail.hight * detail.units) / 6000
      : weight
  );

  const total = summary
    .reduce(
      (total, currentItem) =>
        (total = Number(total) + Number(currentItem) || 0),
      0
    )
    .toFixed(2);
  console.log(weight);

  return (
    <div>
      <input
        type="text"
        className="chargeableWeight text-center"
        disabled
        value={`${total} Kg`}
        {...register("chargeableWeight")}
      />
    </div>
  );
}

export default Result;
