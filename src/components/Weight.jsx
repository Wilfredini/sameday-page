import { useQuote } from "./contexts/QuoteContext";

function Weight() {
  const { weight, register } = useQuote();

  const grossWeight = weight.toFixed(2);

  return (
    <input
      className="chargeableWeight text-center"
      type="text"
      {...register("grossWeight")}
      disabled
      value={`${grossWeight} Kg`}
    />
  );
}

export default Weight;
