import { useQuote } from "./contexts/QuoteContext";

// eslint-disable-next-line react/prop-types
function CostResult({ index }) {
  const { shipmentDetails, shipmentCosts, weight, register } = useQuote();

  const summary = shipmentDetails?.map((detail) =>
    (detail.lengthOf * detail.width * detail.hight * detail.units) / 6000 >=
    weight
      ? (detail.lengthOf * detail.width * detail.hight * detail.units) / 6000
      : weight
  );

  const total = summary?.reduce(
    (total, currentItem) => (total = Number(total) + Number(currentItem)),
    0
  );

  const resultCosts =
    shipmentCosts?.map((cost) =>
      cost.selection === "rate"
        ? Number(total) * Number(cost.airRate)
        : cost.selection === "price"
        ? Number(0) + Number(cost.airRate)
        : Number(weight) * Number(cost.airRate)
    ) || "";

  console.log(resultCosts);

  return (
    <div>
      <input
        type="text"
        className="input text-center"
        disabled
        value={resultCosts[index]}
        {...register("costs.costResult")}
      />
    </div>
  );
}

export default CostResult;
