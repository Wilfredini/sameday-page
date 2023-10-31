import { useQuote } from "./contexts/QuoteContext";

function Weight() {
  const { weight } = useQuote();

  return <p className="chargeableWeight">{weight} Kg</p>;
}

export default Weight;
