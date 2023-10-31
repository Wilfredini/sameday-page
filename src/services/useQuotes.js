import { useQuery } from "@tanstack/react-query";
import { getQuotes } from "./apiquotes";

function useQuotes() {
  const {
    isLoading,
    id: quotesId,
    data: quotes,
  } = useQuery({
    queryKey: ["quotes"],
    queryFn: getQuotes,
    staleTime: 0,
  });
  return { isLoading, quotesId, quotes };
}

export default useQuotes;
