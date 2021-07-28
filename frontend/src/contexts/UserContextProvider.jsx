import { useEffect, useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem("metalLycraUser")) || null;
  const [user, setUser] = useState(localUser);
  const [admin, setAdmin] = useState(false);
  
  useEffect(() => {
    if (user) {
      if (user.role > 0) {
        setAdmin(true);
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, localUser, admin, setAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
