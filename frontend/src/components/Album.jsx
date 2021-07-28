import { useContext, useEffect, useState } from "react";
import { Card, Container, Alert, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import deleteApi from "../utils/deleteApi";
import fetchApi from "../utils/fetchApi";

export default function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState({});
  const [alert, setAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [genres, setGenres] = useState([]);
  const { admin } = useContext(UserContext);

  async function fetchData(id) {
    await fetchApi(`albums/${id}`).then(([r]) => setAlbum(r));
    await fetchApi(`albums/genre/${id}`).then((r) => setGenres(r));
  }
  useEffect(() => {
    fetchData(id);
  }, [id]);

  const deleteAlbum = () => {
    setDeleting(true);
    setAlert(false);
    deleteApi(`albums/${id}`);
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
        <p>Vous êtes sûr de vouloir supprimer cet album ?</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => deleteAlbum()} variant="outline-danger">
            OUI !
          </Button>
        </div>
      </Alert>
      <Alert show={deleting} variant="success">
        <Alert.Heading>Succès !</Alert.Heading>
        <p>L'album a bien été supprimé !</p>
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
              <Card.Title>{album.name}</Card.Title>
              {admin && (
                <Button variant="danger" onClick={() => setAlert(true)}>
                  X
                </Button>
              )}
            </div>
          </Card.Header>

          <Card.Body>
            <Card.Title>{album.bandName}</Card.Title>
            <Card.Text></Card.Text>
            {genres &&
              genres.map((genre) => <Card.Text>{genre.nameGenre}</Card.Text>)}
            <Card.Img variant="top" src={album.image} alt={album.name} />
            <Card.Text>{album.releaseYear}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
