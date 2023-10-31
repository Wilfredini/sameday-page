import { useEffect } from "react";
import { getQuotes } from "../services/apiquotes";
import QuotesTable from "../components/QuotesTable";
import PageNav from "../components/PageNav";

function QuotesPage() {
  useEffect(function () {
    getQuotes().then((data) => console.log(data));
  }, []);

  return (
    <div>
      <PageNav />
      <QuotesTable />
    </div>
  );
}

export default QuotesPage;
