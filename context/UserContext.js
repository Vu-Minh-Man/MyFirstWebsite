import { useState, useEffect, createContext, useContext } from "react";
import { getCurrentUser } from "../services/userService";

const UserContext = createContext();

export function UserWrapper({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default function useUserContext() {
  return useContext(UserContext);
}
