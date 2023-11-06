/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */

import { useQuote } from "./contexts/QuoteContext";
import { DevTool } from "@hookform/devtools";

import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";
import Result from "./Result";
import Weight from "./Weight";
import ShipmentCosts from "./shipmentCosts";
import Price from "./Price";
import { AiOutlineUpload } from "react-icons/ai";

function ShipmentFields() {
  const {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    shipmentFields,
    appendUnit,
    removeUnit,
    shipmentDetails,
    isCreating,
    handleCreate,
  } = useQuote();

  return (
    <>
      <form
        action="form"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="input-box">
          <div className="input-wrapper d-flex ">
            <input
              placeholder="Název přepravy"
              className="transportName text-center"
              type="text"
              id="name"
              {...register(`name`, {
                valueAsNumber: false,
              })}
            />

            <label htmlFor="image">
              <AiOutlineUpload className="logiIcon" /> Logo klienta
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              {...register("image")}
            />
          </div>
        </div>
        <div className="shipment-dimensions ">
          <h2 className="details-title">Detaily zásilky</h2>
          <div className="input-box ">
            <div className="input-wrapper d-flex justify-content-center align-items-center">
              <label className="label" htmlFor="weight">
                Weight
              </label>
              <input
                className="input"
                type="text"
                id="weight"
                {...register(`weight`, {
                  valueAsNumber: true,
                })}
              />
            </div>
            <p className="error">{errors?.weight?.message}</p>
          </div>
          {shipmentFields.map((field, index) => {
            return (
              <div key={field.id} className="details">
                <h6>{index + 1}.</h6>
                <AddButton
                  onClick={() =>
                    appendUnit({
                      units: "",
                      lengthOf: "",
                      width: "",
                      hight: "",
                    })
                  }
                />
                {index > 0 && (
                  <DeleteButton onClick={() => removeUnit(index)} />
                )}
                <div className="input-box ">
                  <div className="input-wrapper">
                    <label className="label" htmlFor="units">
                      Units
                    </label>

                    <input
                      className="input"
                      type="text"
                      id="units"
                      {...register(`shipmentDetails.${index}.units`, {
                        valueAsNumber: true,
                        required: {
                          value: true,
                          message: "Je nutné zadat počet kusů",
                        },
                      })}
                    />
                  </div>

                  <p className="error">
                    {errors?.shipmentDetails?.[index]?.units?.message}
                  </p>
                </div>
                <div className="input-box ">
                  <div className="input-wrapper">
                    <label className="label" htmlFor="lengthOf">
                      Length
                    </label>
                    <input
                      className="input"
                      type="text"
                      id="lengthOf"
                      {...register(`shipmentDetails.${index}.lengthOf`, {
                        valueAsNumber: true,
                        required: {
                          value: true,
                          message: "Je nutné zadat délku",
                        },
                      })}
                    />
                  </div>
                  <p className="error">
                    {errors.shipmentDetails?.[index]?.lengthOf?.message}
                  </p>
                </div>
                <div className="input-box ">
                  <div className="input-wrapper">
                    <label className="label" htmlFor="width">
                      Width
                    </label>
                    <input
                      className="input"
                      type="text"
                      id="width"
                      {...register(`shipmentDetails.${index}.width`, {
                        valueAsNumber: true,
                        required: {
                          value: true,
                          message: "Je nutné zadat šířku",
                        },
                      })}
                    />
                  </div>
                  <p className="error">
                    {errors.shipmentDetails?.[index]?.width?.message}
                  </p>
                </div>
                <div className="input-box ">
                  <div className="input-wrapper">
                    <label className="label" htmlFor="hight">
                      Hight
                    </label>
                    <input
                      className="input"
                      type="text"
                      id="hight"
                      {...register(`shipmentDetails.${index}.hight`, {
                        valueAsNumber: true,
                        required: {
                          value: true,
                          message: "Je nutné zadat výšku",
                        },
                      })}
                    />
                  </div>
                  <p className="error">
                    {errors.shipmentDetails?.[index]?.hight?.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <ShipmentCosts />
        <div className="d-flex justify-content-between p-3 w-100">
          {shipmentDetails && (
            <div>
              <h3>Chargeable Weight</h3>
              <Result />
            </div>
          )}
          {shipmentDetails && (
            <div>
              <h3>Gross Weight</h3>
              <Weight />
            </div>
          )}
          {shipmentDetails && (
            <div>
              <h3>Total Price</h3>
              <Price />
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center my-4 w-100">
          <button
            type="submit"
            disabled={isCreating}
            className="btn btn-warning button mx-2"
          >
            Přepočítat
          </button>
          <button
            onClick={handleCreate}
            disabled={isCreating}
            type="button"
            className="btn btn-success button mx-2"
          >
            Vytvořit
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default ShipmentFields;
