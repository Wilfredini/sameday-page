/* eslint-disable no-unused-vars */
import { useQuote } from "./contexts/QuoteContext";

function Price() {
  const { shipmentDetails, shipmentCosts, weight, register, setValue } =
    useQuote();

  const summary = shipmentDetails.map((detail) =>
    (detail.lengthOf * detail.width * detail.hight * detail.units) / 6000 >=
    weight
      ? (detail.lengthOf * detail.width * detail.hight * detail.units) / 6000
      : weight ||
        (detail.lengthOf * detail.width * detail.hight * detail.units) / 6000
  );

  const total = summary
    .reduce(
      (total, currentItem) => (total = Number(total) + Number(currentItem)),
      0
    )
    .toFixed(2);

  console.log(summary);

  const prices = shipmentCosts.map((cost) =>
    cost.selection === "price" || cost.selection === "" || cost.airRate === ""
      ? Number(0) + Number(cost.airRate)
      : Number(cost.airRate) === 0
  );

  const finalPrices = prices
    .reduce(
      (total, currentItem) =>
        (total = Number(total) + Number(currentItem) || 0),
      0
    )
    .toFixed(2);

  const rates = shipmentCosts.map(
    (cost) =>
      (cost.selection === "rate" && Number(total)) * Number(cost.airRate)
  );

  const finalRates = rates
    .reduce(
      (total, currentItem) => (total = total + Number(currentItem) || 0),
      0
    )
    .toFixed(2);

  const grossWeightRates = shipmentCosts.map(
    (cost) =>
      (cost.selection === "grossWeightRate" && Number(weight)) *
      Number(cost.airRate)
  );

  const finalGrossWeightRates = grossWeightRates
    .reduce(
      (total, currentItem) => (total = total + Number(currentItem) || 0),
      0
    )
    .toFixed(2);

  console.log(finalGrossWeightRates);

  const totalCosts =
    Number(finalPrices) + Number(finalRates) + Number(finalGrossWeightRates);

  const currencyFormat = new Intl.NumberFormat("de-DE", {
    currency: "EUR",
    style: "currency",
  });

  return (
    <div>
      <input
        className="chargeableWeight text-center"
        type="text"
        value={setValue("totalCosts", currencyFormat.format(totalCosts))}
        {...register("totalCosts")}
        disabled
      />
    </div>
  );
}

export default Price;
