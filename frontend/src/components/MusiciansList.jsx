import { useState, useEffect, useContext } from "react";
import { ListGroup, Nav, Container, Button } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import fetchApi from "../utils/fetchApi";
import Musician from "./Musician";

export default function MusiciansList() {
  const [musicians, setMusicians] = useState([]);
  const {admin} = useContext(UserContext);

  useEffect(() => {
    fetchApi("musicians").then((r) => setMusicians(r));
  }, []);

  return (
    <>
      <ListGroup className="d-flex justify-content-evenly">
        <ListGroup.Item>
          <h3 className="text-center">Musicians</h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="/"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
          >
            {musicians.map((musician) => (
              <Nav.Item as="li" key={musician.id}>
                <Nav.Link>
                  <Link to={`/musicians/${musician.id}`}>
                    {musician.firstName} {musician.lastName}
                  </Link>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Container className="d-flex justify-content-evenly" style={{width:"70%"}}>
             {admin && <Button variant="outline-success"><Link to='/addMusician'>Ajouter un musicien</Link></Button>}
              </Container>
        </ListGroup.Item>
      </ListGroup>
      <Switch>
        <Route path="/musicians/:id" component={Musician} />
      </Switch>
    </>
  );
}
