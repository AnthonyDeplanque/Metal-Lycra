import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function IsLoggedIn() {
  const { user, setUser, setAdmin } = useContext(UserContext);
  const disconnection = () => {
    setUser(null);
    setAdmin(false);
    localStorage.removeItem("metalLycraUser");
  };
  return (
    <Card className="log-panel">
      <Card.Header>
        <Card.Title className="log-panel-title"> Hello, {user.nickName}</Card.Title>
      </Card.Header>
        <Button className='m-1'>
      <Link to="/userinfo" className="button-link log-panel-button">
          Mon profil
      </Link>
          </Button>
          
      <Button className='m-1 button-link log-panel-button' onClick={disconnection}>Déconnexion<Redirect to ='/' /></Button>
    </Card>
  );
}
