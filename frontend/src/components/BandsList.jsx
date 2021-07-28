import {useState, useEffect, useContext } from "react";
import { ListGroup, Nav, Container, Button } from "react-bootstrap";
import { Link, Switch, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import fetchApi from "../utils/fetchApi";
import Band from "./Band";

export default function BandsList(){
  const [bands, setBands] = useState([]);
  const {admin} = useContext(UserContext);

  useEffect(()=>{
    fetchApi("bands").then((r)=>setBands(r));
  }, [])

  return (
    <>
    <ListGroup className="d-flex justify-content-evenly">
        <ListGroup.Item>
          <h3 className="text-center" >Bands</h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="/"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
          >
      {bands.map((band) => (
              <Nav.Item as="li" key={band.id}>
              <Nav.Link>
        <Link to={`/bands/${band.id}`}>{band.name}</Link>
        </Nav.Link>
              </Nav.Item>
      ))}
          </Nav>
          <Container className="d-flex justify-content-evenly" style={{width:"70%"}}>
              {admin && <Button variant="outline-success"><Link to='/addBand'>Ajouter un groupe</Link></Button>}
              </Container>
        </ListGroup.Item>
      </ListGroup>
    <Switch>
      <Route path='/bands/:id' component={Band} />
    </Switch>
  </>)
};