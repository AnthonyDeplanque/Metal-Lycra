import { useContext, useEffect, useState } from "react";
import { ListGroup, Nav, Button, Container} from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import fetchApi from "../utils/fetchApi";
import Album from "./Album";

export default function AlbumsList() {
  const [albums, setAlbums] = useState([]);
  const {admin} = useContext(UserContext);

  useEffect(() => {
    fetchApi("albums").then((r) => setAlbums(r));
  }, []);

  return (
    <>
          <ListGroup className="d-flex justify-content-evenly">
          <ListGroup.Item><h3 className="text-center">Albums</h3></ListGroup.Item>
          <ListGroup.Item>
            <Nav
            fill
            variant="tabs"
            defaultActiveKey="/"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
            {albums.map((album) => (
              <Nav.Item as="li" key={album.id}>
                <Nav.Link>
                  <Link to={`/albums/${album.id}`}>{album.name}</Link>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
            <Container className="d-flex justify-content-evenly" style={{width:"70%"}}>
              {admin && <Button variant="outline-success"><Link to='/addAlbum'>Ajouter un album</Link></Button>}
              </Container>
          </ListGroup.Item>
            </ListGroup>

 
      <Switch>
        <Route path="/albums/:id" component={Album} />
      </Switch>
    </>
  );
}
