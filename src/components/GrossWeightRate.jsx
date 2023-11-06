import { useQuote } from "./contexts/QuoteContext";

function GrossWeightRate() {
  const { shipmentDetails, shipmentCosts } = useQuote();

  const weight = shipmentDetails.map((weight) => weight.weight);

  const totalWeight = weight
    .reduce((total, currentItem) => (total = total + (currentItem || 0)), 0)
    .toFixed(2);

  const grossWeightRates = shipmentCosts.map(
    (cost) =>
      (cost.selection === "grossWeightRate" && Number(totalWeight)) *
      Number(cost.airRate)
  );

  const finalGrossWeightRates = grossWeightRates
    .reduce(
      (total, currentItem) => (total = total + Number(currentItem) || 0),
      0
    )
    .toFixed(2);

  console.log(finalGrossWeightRates);

  return <p className="chargeableWeight">{finalGrossWeightRates} Kg</p>;
}

export default GrossWeightRate;
