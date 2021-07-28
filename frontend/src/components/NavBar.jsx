import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import IsLoggedIn from "./IsLoggedIn";

export default function NavBar() {
  const {user} = useContext(UserContext);

  return (
    <>
      <Navbar collapseOnSelect expand="sm" className="d-flex justify-content-between navbar p-2" bg="light" sticky="top" >

          <Navbar.Toggle aria-control="responsive-navbar-nav"/>
          <HeaderLeft />
          <Navbar.Collapse id ="basic-navbar-nav p-3">
          {user &&
          <Nav className="mx-auto text-center pb-3" >
            <Nav.Link className="navbar-button">
              <Link to="/" data-toggle="collapse">Home</Link>
            </Nav.Link>
            <Nav.Link className="navbar-button">
              <Link to="/bands" data-toggle="collapse" >Groupes</Link>
            </Nav.Link>
            <Nav.Link className="navbar-button">
              <Link to="/musicians" data-toggle="collapse" >Musiciens</Link>
            </Nav.Link>
            <Nav.Link className="navbar-button">
              <Link to="/genres" data-toggle="collapse" >Genres</Link>
            </Nav.Link>
            <Nav.Link className="navbar-button">
              <Link to="/albums" data-toggle="collapse" >Albums</Link>
            </Nav.Link>
          </Nav>
}
            {user ? <IsLoggedIn /> :<div className='mx-auto'><HeaderRight /></div>}
          </Navbar.Collapse>

      </Navbar>
    </>
  );
}
