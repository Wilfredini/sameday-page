/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useQuote } from "./contexts/QuoteContext";

function CostResult({ index }) {
  const [converted, setConverted] = useState("");

  const { shipmentDetails, shipmentCosts, weight } = useQuote();

  const summary = shipmentDetails?.map(
    (detail) =>
      (detail.lengthOf * detail.width * detail.hight * detail.units) / 6000
  );

  const total = summary
    ?.reduce(
      (total, currentItem) => (total = Number(total) + Number(currentItem)),
      0
    )
    .toFixed(2);

  const chargeableWeight = total > weight ? total : weight;

  const currency = shipmentCosts?.map((cost) => cost.currency);

  const resultCosts =
    shipmentCosts?.map((cost) =>
      cost.selection === "rate"
        ? (Number(chargeableWeight) * Number(cost.airRate)).toFixed(2)
        : cost.selection === "price"
        ? (Number(0) + Number(cost.airRate)).toFixed(2)
        : (Number(weight) * Number(cost.airRate)).toFixed(2)
    ) || "";

  const currencyFormatEu = new Intl.NumberFormat("de-DE", {
    currency: `EUR`,
    style: "currency",
  });

  const currencyFormatUs = new Intl.NumberFormat("de-DE", {
    currency: `USD`,
    style: "currency",
  });

  const currencyFormatCz = new Intl.NumberFormat("de-DE", {
    currency: `CZK`,
    style: "currency",
  });

  useEffect(
    function () {
      async function convert() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${resultCosts?.[index]}&from=${currency?.[index]}&to=EUR`
        );
        const data = await res.json();
        setConverted(data.rates["EUR"]);
      }
      convert();
    },
    [resultCosts, currency, index, setConverted]
  );

  console.log(resultCosts);

  return (
    <>
      <div>
        <p className="costResult">
          {currency?.[index] === "EUR" || undefined
            ? `${currencyFormatEu.format(resultCosts[index] || 0)} `
            : currency?.[index] === "USD"
            ? `${currencyFormatUs.format(resultCosts[index] || 0)} `
            : `${currencyFormatCz.format(resultCosts[index] || 0)} `}
        </p>
      </div>
      <p className="costInput w-50 m-0 text-dark d-flex justify-content-center align-items-center">{`${
        converted || resultCosts?.[index] || 0
      } EUR`}</p>
    </>
  );
}
export default CostResult;
