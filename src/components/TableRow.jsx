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
    totalCosts,
  } = quote;

  const queryClient = useQueryClient();

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

  return (
    <>
      {shipmentDetails?.map((detail) => (
        <tr className="rowBox  tableBody" key={detail.id}>
          <td className="tableRow p-3 ">
            <img className="brandLogo" src={image}></img>
          </td>
          <td className="tableRow">{name}</td>
          <td className="tableRow">{detail?.units}</td>
          <td className="tableRow">{weight}</td>
          <td className="tableRow">{totalCosts}</td>

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
