import { Switch, Route } from "react-router";
import Home from "./Home";
import GenresList from "./GenresList";
import BandsList from "./BandsList";
import MusiciansList from "./MusiciansList";
import AlbumsList from "./AlbumsList";
import { Container } from "react-bootstrap";
import AlbumForm from './AlbumForm';
import BandForm from './BandForm';
import GenreForm from './GenreForm';
import MusicianForm from "./MusicianForm";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Login from "./Login";
import UserInfos from "./UserInfos";
import SignIn from "./SignIn";
import UserList from "./UserList";

export default function Dashboard() {
  const {user} = useContext(UserContext);

  return (
    <Container className="center">
      <Switch>
        <Route path="/addUser">
          <SignIn />
        </Route>
        {user ? 
        <>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/userinfo">
          <UserInfos />
        </Route>
        <Route path="/bands">
          <BandsList />
        </Route>
        <Route path="/musicians">
          <MusiciansList />
        </Route>
        <Route path="/genres">
          <GenresList />
        </Route>
        <Route path="/albums">
          <AlbumsList />
        </Route>
        <Route path="/addAlbum">
          <AlbumForm />
        </Route>
        <Route path="/addBand">
          <BandForm />
        </Route>
        <Route path="/addGenre">
          <GenreForm />
        </Route>
        <Route path="/addMusician">
         <MusicianForm />
        </Route>
        <Route path='/userList'>
          <UserList />
        </Route>
</> : <Login /> }
      </Switch>
    </Container>
  );
}
