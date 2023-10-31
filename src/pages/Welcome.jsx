import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="welcome">
      <h1 className="title">Nástroje pro nacenění přeprav.</h1>
      <Link className="btn-ui" to="/login">
        Začít
      </Link>
      <div className="overlay"></div>
    </div>
  );
}

export default Welcome;
