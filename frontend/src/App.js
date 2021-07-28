import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";

import "bootstrap/dist/css/bootstrap.min.css";
import UserContextProvider from "./contexts/UserContextProvider";

function App() {
  return (
    <div className="App">
        <Router>
      <UserContextProvider>
          <NavBar />
          <Dashboard />
      </UserContextProvider>
        </Router>
    </div>
  );
}

export default App;
