/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

import { useForm, useFieldArray } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createQuote } from "../../services/apiquotes";
import { useNavigate } from "react-router-dom";

const QuoteContext = createContext();

function QuoteProvider({ children }) {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      shipmentDetails: [
        {
          units: "",
          lengthOf: "",
          width: "",
          hight: "",
        },
      ],
      costs: [
        {
          airRate: "",
          description: "",
          selection: "rate",
          currency: "EUR",
        },
      ],
      salesCost: "",
      weight: "",
      image: "",
    },
  });
  const { register, control, handleSubmit, formState, reset, setValue } = form;

  const queryClient = useQueryClient();

  const [data, setData] = useState({});

  const shipmentDetails = data.shipmentDetails;
  const shipmentCosts = data.costs;
  const weight = data.weight;
  const salesCost = data.salesCost;

  const summary = shipmentDetails?.map(
    (detail) =>
      (detail.lengthOf * detail.width * detail.hight * detail.units) / 6000
  );

  const total = summary?.reduce(
    (total, currentItem) => (total = Number(total) + Number(currentItem)),
    0
  );

  const chargeableWeight = total > weight ? total : weight;

  const prices = shipmentCosts?.map((cost) =>
    cost.selection === "price" || cost.selection === "" || cost.airRate === ""
      ? Number(0) + Number(cost.airRate)
      : Number(cost.airRate) === 0
  );

  const finalPrices = prices?.reduce(
    (total, currentItem) => (total = Number(total) + Number(currentItem) || 0),
    0
  );

  const rates = shipmentCosts?.map(
    (cost) =>
      (cost.selection === "rate" && Number(chargeableWeight)) *
      Number(cost.airRate)
  );

  const finalRates = rates?.reduce(
    (total, currentItem) => (total = total + Number(currentItem) || 0),
    0
  );

  const grossWeightRates = shipmentCosts?.map(
    (cost) =>
      (cost.selection === "grossWeightRate" && Number(weight)) *
      Number(cost.airRate)
  );

  const finalGrossWeightRates = grossWeightRates?.reduce(
    (total, currentItem) => (total = total + Number(currentItem) || 0),
    0
  );

  const totalCosts = (
    Number(finalPrices || 0) +
    Number(finalRates || 0) +
    Number(finalGrossWeightRates || 0)
  ).toFixed(2);

  const { mutate: mutateCreation, isLoading: isCreating } = useMutation({
    mutationFn: createQuote,
    onSuccess: () => {
      toast.success("Nacenění vytvořeno");
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      reset();
      navigate("/newQuote");
      setData(0);
    },
    onError: (err) => toast.error(err.message),
  });

  const mainData = data;
  console.log(mainData);
  const handleCreate = () => {
    mutateCreation({ ...mainData, image: data.image[0] });
    toast.success("Logo nahráno");
  };

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
    console.log(data);
    setData(data);
  };

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
        setData,
        handleCreate,
        totalCosts,
        setValue,
        salesCost,
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
