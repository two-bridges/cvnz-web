
import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
const UserContext = createContext({});

export default function UserProvider({ children }) {

  //your variables
  //example
  const [person, setPerson] = useState('');
  useEffect(() => {
    let mounted = true;
    setPerson("Test");
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <UserContext.Provider
      value={person}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) throw new Error("useUser must be used within a CountProvider");
  const person = context;

  return { person };
}
