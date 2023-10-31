/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createQuote } from "../../services/apiquotes";

const QuoteContext = createContext();

function QuoteProvider({ children }) {
  const form = useForm({});
  const { register, control, handleSubmit, formState, reset } = form;
  const [data, setData] = useState({});

  const queryClient = useQueryClient();

  const { mutate: mutateCreation, isLoading: isCreating } = useMutation({
    mutationFn: createQuote,
    onSuccess: () => {
      toast.success("Nacenění vytvořeno");
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const shipmentDetails = data.shipmentDetails;
  const shipmentCosts = data.costs;
  const weight = data.weight;
  console.log(data);

  const { errors } = formState;

  const {
    fields: shipmentFields,
    append: appendUnit,
    remove: removeUnit,
  } = useFieldArray({
    name: "shipmentDetails",

    control,
  });

  const {
    fields: costsFields,
    append: appendCost,
    remove: removeCost,
  } = useFieldArray({
    name: "costs",

    control,
  });

  const onSubmit = (data) => {
    setData(data);
    mutateCreation(data);
  };
  console.log(data);
  return (
    <QuoteContext.Provider
      value={{
        register,
        control,
        handleSubmit,
        onSubmit,
        errors,
        shipmentFields,
        appendUnit,
        removeUnit,
        costsFields,
        appendCost,
        removeCost,
        data,
        shipmentDetails,
        shipmentCosts,
        weight,
        isCreating,
        mutateCreation,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

function useQuote() {
  const context = useContext(QuoteContext);
  if (context === undefined)
    throw new Error("QuoteContext was used outside the QuoteProvider");
  return context;
}

export { QuoteProvider, useQuote };
