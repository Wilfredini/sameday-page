import Spinner from "react-bootstrap/Spinner";

function Spin() {
  return (
    <div className="w-100 h-100">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Spin;
