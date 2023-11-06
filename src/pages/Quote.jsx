import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import ShipmentFields from "../components/ShipmentFields";

function Quote() {
  return (
    <>
      <div className="quote">
        <div className="quote">
          <PageNav />
          <main className="container main-quote ">
            <div>
              <div className="fieldWrapper">
                <ShipmentFields />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Quote;
