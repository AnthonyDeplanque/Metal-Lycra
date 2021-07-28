import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function UserInfos() {
  const { user, admin } = useContext(UserContext);

  const formatTime = (ts) => {
    const arrMonth = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "aout",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    const timestamp = new Date(ts);
    const year = timestamp.getFullYear();
    const month = arrMonth[timestamp.getMonth()];
    const day = timestamp.getDate();
    let hour = timestamp.getHours();
    let minute = timestamp.getMinutes();
    if (minute<10) { minute = '0'+minute}
    if (hour<10) { hour = '0'+hour}
    return `Le ${day} ${month} ${year}, à ${hour}:${minute}`;
  };

  const getRole = (role) => {
    switch (role) {
      case 0:
        return "utilisateur";
      case 1:
        return "modérateur";
      case 2:
        return "administrateur";
      default:
        return "impossible de récupérer le rôle";
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Bonjour, {user.nickName}</Card.Title>
      </Card.Header>
        <Card.Body>
          <hr/>
          <Card.Text>{user.email}</Card.Text>
          <Card.Text>
            inscription : {formatTime(user.dateOfInscription)}
          </Card.Text>
          <Card.Text>
            {user.firstName} {user.lastName}
            <hr />
            {getRole(user.role)}
          </Card.Text>
          {admin && <Button ><Link className="button-link" to="/userList">Liste des utilisateurs</Link></Button>}
        </Card.Body>
    </Card>
  );
}

export default UserInfos;
