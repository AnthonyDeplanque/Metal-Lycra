import { useContext, useEffect, useState } from "react";
import { Card, Container, Alert, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import fetchApi from "../utils/fetchApi";
import deleteApi from "../utils/deleteApi";
import Usercontext from "../contexts/UserContext";

export default function Musician() {
  const { id } = useParams();
  const [musician, setMusician] = useState({});
  const [alert, setAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [band, setBand] = useState({});
  const { admin } = useContext(Usercontext);

  useEffect(() => {
    fetchApi(`musicians/${id}`).then(([r]) => setMusician(r));
    fetchApi(`musicians/inband/${id}`).then(([r]) => setBand(r));
  }, [id]);

  const deleteMusician = () => {
    setDeleting(true);
    setAlert(false);
    deleteApi(`musicians/${id}`);
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
        <p>Vous êtes sûr de vouloir supprimer ce musicien ?</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => deleteMusician()} variant="outline-danger">
            OUI !
          </Button>
        </div>
      </Alert>
      <Alert show={deleting} variant="success">
        <Alert.Heading>Succès !</Alert.Heading>
        <p>Le musicien a bien été supprimé !</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setDeleting(false)} variant="outline-success">
            <Link to="/">Fermer</Link>
          </Button>
        </div>
      </Alert>
      <Container className="center" style={{ width: "70%" }}>
        <Card border="dark" className="text-center">
          <Card.Header>
            <div className="d-flex justify-content-between">
              <Card.Title>
                {musician.firstName} {musician.lastName}
              </Card.Title>
              {admin && (
                <Button variant="danger" onClick={() => setAlert(true)}>
                  X
                </Button>
              )}
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Text>{musician.instrument}</Card.Text>
            {band.name && <Card.Text>{`Joue dans ${band.name}`}</Card.Text>}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
