import { useContext, useEffect, useState } from "react";
import { Card, Container, Alert, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import fetchApi from "../utils/fetchApi";
import deleteApi from "../utils/deleteApi";
import UserContext from "../contexts/UserContext";

export default function Genre() {
  const { id } = useParams();
  const [genre, setGenre] = useState({});
  const [alert, setAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { admin } = useContext(UserContext);

  useEffect(() => {
    fetchApi(`genres/${id}`).then(([r]) => setGenre(r));
  }, [id]);
  const deleteGenre = () => {
    setDeleting(true);
    setAlert(false);
    deleteApi(`genres/${id}`);
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
        <p>Vous êtes sûr de vouloir supprimer ce genre ?</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => deleteGenre()} variant="outline-danger">
            OUI !
          </Button>
        </div>
      </Alert>
      <Alert show={deleting} variant="success">
        <Alert.Heading>Succès !</Alert.Heading>
        <p>Le genre a bien été supprimé !</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button variant="outline-success">
            <Link to="/" onClick={() => setDeleting(false)}>
              Fermer
            </Link>
          </Button>
        </div>
      </Alert>
      <Container className="center" style={{ width: "70%" }}>
        <Card className="text-center" border="dark">
          <Card.Header>
            <div className="d-flex justify-content-between">
              <Card.Title>{genre.name}</Card.Title>
              {admin && (
                <Button variant="danger" onClick={() => setAlert(true)}>
                  X
                </Button>
              )}
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Text>{genre.description}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
