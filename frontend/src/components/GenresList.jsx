import { useState, useEffect, useContext } from "react";
import { ListGroup, Nav, Container, Button } from "react-bootstrap";
import { Link, Switch, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import fetchApi from "../utils/fetchApi";
import Genre from "./Genre";

export default function GenresList() {
  const [genres, setGenres] = useState([]);
  const {admin} = useContext(UserContext)

  useEffect(() => {
    fetchApi("genres").then((r) => setGenres(r));
  }, []);

  return (
    <>
      <ListGroup className="d-flex justify-content-evenly">
        <ListGroup.Item>
          <h3 className="text-center">Genres</h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="/"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
          >
            {genres.map((genre) => (
              <Nav.Item as="li" key={genre.id}>
                <Nav.Link>
                  <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Container
            className="d-flex justify-content-evenly"
            style={{ width: "70%" }}
          >
            {admin && <Button variant="outline-success">
              <Link to="/addGenre">Ajouter un genre</Link>
            </Button>}
          </Container>
        </ListGroup.Item>
      </ListGroup>

      <Switch>
        <Route path="/genres/:id" component={Genre} />
      </Switch>
    </>
  );
}
