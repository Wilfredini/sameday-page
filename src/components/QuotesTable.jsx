import { useQuery } from "@tanstack/react-query";
import { getQuotes } from "../services/apiquotes";
import { Link } from "react-router-dom";

import Spin from "./Spinner";
import TableRow from "./TableRow";

function QuotesTable() {
  const { isLoading, data: quotes } = useQuery({
    queryKey: ["quotes"],
    queryFn: getQuotes,
  });

  console.log(quotes);

  return (
    <>
      <div className="tablePage">
        <div className="review container">
          <h1 className="tableTitle">Přehled naceněných přeprav</h1>
          {quotes ? (
            <p>Žádné naceněné přepravy</p>
          ) : (
            <div className="table rounded text-center">
              {isLoading ? (
                <Spin />
              ) : (
                <table className="tableBox ">
                  <thead>
                    <tr className="tableHeader">
                      <th>Firma</th>
                      <th>Váha</th>
                      <th>Název</th>
                      <th>Měna</th>
                      <th>Akce</th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {quotes.map((quote) => (
                      <TableRow quote={quote} key={quote.id} />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          <Link className="btn btn-success" to="/createQuote">
            Vytvořit nacenění
          </Link>
        </div>
      </div>
    </>
  );
}

export default QuotesTable;
