/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useQuote } from "./contexts/QuoteContext";

function TotalPrice({ index }) {
  const [converted, setConverted] = useState([""]);

  const { shipmentCosts } = useQuote();

  const currency = shipmentCosts?.map((cost) => cost.currency);

  const resultCosts = converted?.reduce(
    (total, currentItem) => (total = total + currentItem),
    0
  );

  const currencyFormatEu = new Intl.NumberFormat("de-DE", {
    currency: `EUR`,
    style: "currency",
  });

  useEffect(
    function () {
      async function convert() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${resultCosts?.[index]}&from=${currency}&to=EUR`
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
    <div>
      <p>{currencyFormatEu.format(resultCosts)}</p>
    </div>
  );
}

export default TotalPrice;
