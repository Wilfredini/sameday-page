import HomeCards from "../components/HomeCards";
import PageNav from "../components/PageNav";

const cards = [
  {
    title: "OBC",
    image: "/public/pexels-victor-freitas-1381415.jpg",
    text: "Přepravy palubním kurýrem",
    id: 1,
  },
  {
    title: "Airfreight",
    image: "/public/pexels-pixabay-358220.jpg",
    text: "Letecké přepravy",
    id: 2,
  },
  {
    title: "Road",
    image: "/public/pexels-tima-miroshnichenko-6169668.jpg",
    text: "Pozemní přepravy",
    id: 3,
  },
  {
    title: "Charter",
    image: "/public/254b798f-d7b4-4b77-bb2d-3b73ec5f4d91.jpg",
    text: "Charterové lety",
    id: 4,
  },
];

function HomePage() {
  return (
    <>
      <div className="main">
        <PageNav />
        <main className="app container">
          <div className="overlay"></div>
          <div className="d-flex justify-content-between align-items-center">
            <section className="homepage">
              <div className="row">
                <div className="card-wrapper">
                  {cards.map((card) => (
                    <HomeCards cards={card} key={card.id} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default HomePage;
