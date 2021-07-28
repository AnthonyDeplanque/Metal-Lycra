import { useContext, useEffect, useState } from "react";
import { Card, Container, Alert, Button, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import fetchApi from "../utils/fetchApi";
import deleteApi from "../utils/deleteApi";
import UserContext from "../contexts/UserContext";

export default function Band() {
  const { id } = useParams();
  const [band, setBand] = useState({});
  const [alert, setAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [musicians, setMusicians] = useState([]);
  const {admin} = useContext(UserContext);

  useEffect(() => {
    fetchApi(`bands/hasmusician/${id}`)
      .then((r) => setMusicians(r))
      .then(console.log(musicians));
    fetchApi(`bands/${id}`).then(([r]) => setBand(r));
  }, [id]);
  const deleteBand = () => {
    setDeleting(true);
    setAlert(false);
    deleteApi(`bands/${id}`);
  };
  return (
    <>
      <Alert
        show={alert}
        variant="danger"
        onClose={() => setAlert(false)}
        dismissible
      >
        <Alert.Heading>Attention !</Alert.Heading>
        <p>Vous êtes sûr de vouloir supprimer ce groupe ?</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => deleteBand()} variant="outline-danger">
            OUI !
          </Button>
        </div>
      </Alert>
      <Alert show={deleting} variant="success">
        <Alert.Heading>Succès !</Alert.Heading>
        <p>Le groupe a bien été supprimé !</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setDeleting(false)} variant="outline-success">
            <Link to="/">Fermer</Link>
          </Button>
        </div>
      </Alert>
      <Container border="dark" className="center" style={{ width: "70%" }}>
        <Card border="dark" className="text-center">
          <Card.Header>
            <div className="d-flex justify-content-between">
              <Card.Title>{band.name}</Card.Title>
              {admin && <Button variant="danger" onClick={() => setAlert(true)}>
                X
              </Button>}
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Img variant="top" src={band.image} alt={band.name} />
            {band.formationYear}
            <Card border="dark" bg="light" className="d-flex justify-content-between" size="sm">
              <h3> LINE UP : </h3>
              <hr />
              <Row>
            {musicians &&
              musicians.map((musician) => (
                    <Col>
                    <span>{`${musician.firstName} ${musician.lastName}`}</span>
                    <br />
                    <p>{musician.instrument}</p>
                    </Col>

                    ))}
                    </Row>
              </Card>
            <Card.Text>{band.description}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
