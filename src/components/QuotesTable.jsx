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

  return (
    <>
      <div className="tablePage">
        <div className="review container">
          <h1 className="tableTitle">Přehled naceněných přeprav</h1>
          {(quotes !== null && (
            <div className="table text-center">
              {isLoading ? (
                <Spin />
              ) : (
                <table className="tableBox ">
                  <thead>
                    <tr className="tableHeader">
                      <th>Firma</th>
                      <th>Název</th>
                      <th>Počet ks</th>
                      <th>Váha</th>
                      <th>Náklad</th>
                      <th>Prodejka</th>
                      <th>Akce</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((quote) => (
                      <TableRow
                        className="tableBody"
                        quote={quote}
                        key={quote.id}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )) || <p>Žádné naceněné přepravy</p>}
          <Link className="btn btn-success" to="/createQuote">
            Vytvořit nacenění
          </Link>
        </div>
      </div>
    </>
  );
}

export default QuotesTable;
