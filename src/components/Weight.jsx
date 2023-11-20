import { useQuote } from "./contexts/QuoteContext";

function Weight() {
  const { weight } = useQuote();

  const grossWeight = Number(weight || 0).toFixed(2);

  return <p className="chargeableWeight mx-2">{`${grossWeight || 0} Kg`}</p>;
}

export default Weight;
