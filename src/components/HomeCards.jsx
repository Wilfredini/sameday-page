/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import Card from "react-bootstrap/Card";
import Button from "./Button";

function HomeCards({ cards }) {
  return (
    <div className="col-12 col-md-6 p-3 card-box">
      <Card className="card">
        <Card.Img variant="top" src={cards.image} width="100%" height="200px" />
        <Card.Body>
          <Card.Title className="title">{cards.title}</Card.Title>
          <Card.Text className="text">{cards.text}</Card.Text>
        </Card.Body>
        <Button>Nacenit</Button>
      </Card>
    </div>
  );
}

export default HomeCards;
