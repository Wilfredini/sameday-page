import { deleteQuote } from "../services/apiquotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

/* eslint-disable react/prop-types */
function TableRow({ quote }) {
  const {
    id: quotesId,
    name,
    shipmentDetails,
    image,
    weight,
    salesCost,
  } = quote;

  const queryClient = useQueryClient();

  const summary = quote.shipmentDetails?.map(
    (detail) =>
      (detail.lengthOf * detail.width * detail.hight * detail.units) / 6000
  );

  const total = summary?.reduce(
    (total, currentItem) => (total = Number(total) + Number(currentItem)),
    0
  );
  const chargeableWeight = total > weight ? total : weight;

  const prices = quote.costs?.map((cost) =>
    cost.selection === "price" || cost.selection === "" || cost.airRate === ""
      ? Number(0) + Number(cost.airRate)
      : Number(cost.airRate) === 0
  );

  const finalPrices = prices?.reduce(
    (total, currentItem) => (total = Number(total) + Number(currentItem) || 0),
    0
  );

  const rates = quote.costs?.map(
    (cost) =>
      (cost.selection === "rate" && Number(chargeableWeight)) *
      Number(cost.airRate)
  );

  const finalRates = rates?.reduce(
    (total, currentItem) => (total = total + Number(currentItem) || 0),
    0
  );
  console.log(finalRates);
  const grossWeightRates = quote.costs?.map(
    (cost) =>
      (cost.selection === "grossWeightRate" && Number(weight)) *
      Number(cost.airRate)
  );

  const finalGrossWeightRates = grossWeightRates?.reduce(
    (total, currentItem) => (total = total + Number(currentItem) || 0),
    0
  );

  const totalCosts =
    Number(finalPrices || 0) +
    Number(finalRates || 0) +
    Number(finalGrossWeightRates || 0);
  console.log(totalCosts);

  console.log(totalCosts);

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteQuote,
    onSuccess: () => {
      toast.success("Nacenění vymazáno");
      queryClient.invalidateQueries({
        queryKey: ["quotes"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const currencyFormat = new Intl.NumberFormat("de-DE", {
    currency: "EUR",
    style: "currency",
  });

  return (
    <>
      {shipmentDetails?.map((detail, index) => (
        <tr className="rowBox  tableBody" key={index}>
          <td className="tableRow p-3 ">
            <img className="brandLogo" src={image}></img>
          </td>
          <td className="tableRow ">{name}</td>
          <td className="tableRow">{detail?.units}</td>
          <td className="tableRow">{weight}</td>
          <td className="tableRow">{currencyFormat.format(totalCosts)}</td>
          <td className="tableRow">
            {currencyFormat.format(Number(salesCost))}
          </td>

          <td className="tableRow">
            <AiFillEdit role="button" size={30} className="editIcon" />
            <AiFillDelete
              size={30}
              className="deleteIcon"
              role="button"
              onClick={() => mutate(quotesId)}
              disabled={isDeleting}
            />
          </td>
        </tr>
      ))}
    </>
  );
}

export default TableRow;
