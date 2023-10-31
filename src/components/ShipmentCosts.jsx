import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";
import { useQuote } from "./contexts/QuoteContext";

function ShipmentCosts() {
  const { register, appendCost, removeCost, costsFields } = useQuote();
  return (
    <div className="w-100">
      <div className="shipment-rates">
        <h2 className="costs-title">Costy na přepravu</h2>
        <div className="costs-wrapper row">
          {costsFields.map((cost, index) => {
            return (
              <div className="input-box" key={cost.id}>
                <div className="input-wrapper">
                  <AddButton
                    onClick={() =>
                      appendCost({
                        airRate: "",
                        description: "",
                        selection: "",
                      })
                    }
                  />
                  <div className="d-flex flex-column">
                    <select
                      className="select"
                      id="selection"
                      {...register(`costs.${index}.selection`)}
                    >
                      <option value="rate">Rejt z účtované váhy</option>
                      <option value="price">Price</option>
                      <option value="grossWeightRate">
                        Rejt z reálné váhy
                      </option>
                    </select>
                  </div>

                  <div className="d-flex flex-column">
                    <input
                      placeholder="Popis"
                      type="text"
                      id="description"
                      name="description"
                      className="costInput"
                      {...register(`costs.${index}.description`)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <input
                      placeholder="Hodnota"
                      type="text"
                      id="airRate"
                      name="airRate"
                      className="costInput"
                      {...register(`costs.${index}.airRate`)}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <select
                      className="select"
                      id="currency"
                      {...register(`costs.${index}.currency`)}
                    >
                      <option value="eur">€</option>
                      <option value="usd">$</option>
                      <option value="czk">CZK</option>
                    </select>
                  </div>
                  {(index.length === 0 && <DeleteButton />) || (
                    <DeleteButton
                      disabled={true}
                      onClick={() => removeCost(index)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ShipmentCosts;
