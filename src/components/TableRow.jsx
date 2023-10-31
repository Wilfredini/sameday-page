import { deleteQuote } from "../services/apiquotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

/* eslint-disable react/prop-types */
function TableRow({ quote }) {
  const { id: quotesId, name, image, currency, weight } = quote;

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
    <tr>
      <td className="tableRow p-3 ">
        <img src={image} width="120px" height="80px"></img>
      </td>
      <td className="tableRow">{weight}</td>
      <td className="tableRow">{name}</td>
      <td className="tableRow">{currency}</td>
      <td>
        <button className="btn btn-primary">Upravit</button>
        <button
          className="btn btn-danger mx-2"
          onClick={() => mutate(quotesId)}
          disabled={isDeleting}
        >
          Vymazat
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
