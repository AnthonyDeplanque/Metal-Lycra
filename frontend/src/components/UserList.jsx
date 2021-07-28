import React, { useContext, useEffect, useState } from 'react';
import { Card, Container, ListGroup, ListGroupItem, Alert, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import UserContext from '../contexts/UserContext';
import fetchApi from '../utils/fetchApi';
import deleteApi from '../utils/deleteApi';
import Unauthorized from './Unauthorized';

function UserList() {
  const [users, setUsers] = useState();
  const [alert, setAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const {admin} = useContext(UserContext);

  
  const deleteUser = (id) => {
    deleteApi(`users/${id}`);
    setAlert(false);
    window.location.reload();
  };
  
  useEffect(()=>{
    fetchApi('users').then(r=>setUsers(r));
  },[]);


  
  return (
    admin ? 
<>

<Container>

<Alert
        show={alert}
        variant="danger"
        onClose={() => setAlert(false)}
        dismissible
      >
        <Alert.Heading>Attention !</Alert.Heading>
        <p>Vous êtes sûr de vouloir supprimer cet utilisateur ?</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => deleteUser(idToDelete)} variant="outline-danger">
            OUI !
            <Redirect to ='/userList' />
          </Button>
        </div>
      </Alert>
    {users && 
    <ListGroup>
      {users.map((user)=> {
        return(
        <Card>
        <ListGroupItem className="d-flex justify-content-between">{user.nickName} <Button variant="danger" onClick={()=>{setIdToDelete(user.id);setAlert(true)}}>X</Button></ListGroupItem>
        
        
        </Card>)
      })}
    </ListGroup>
    }
</Container>
</>
    :
    <Unauthorized />
  );
}

export default UserList;