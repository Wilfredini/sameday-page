import AddButton from "./AddButton";
import CostResult from "./CostResult";
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
                        selection: "rate",
                        currency: "EUR",
                      })
                    }
                  />
                  <div className="d-flex flex-column">
                    <select
                      className="select"
                      id="selection"
                      {...register(`costs.${index}.selection`)}
                    >
                      <option defaultValue="rate" value="rate">
                        Rejt z účtované váhy
                      </option>
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
                      <option defaultValue="EUR" value="EUR">
                        EUR
                      </option>
                      <option value="USD">USD</option>
                      <option value="CZK">CZK</option>
                    </select>
                  </div>
                  <CostResult index={index} />
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

        <div className="text-center salesCost">
          <input
            placeholder="Prodejka"
            type="text"
            id="salesCost"
            className="costInput"
            {...register(`salesCost`)}
          />
        </div>
      </div>
    </div>
  );
}

export default ShipmentCosts;
