import React, { createContext, useState } from 'react';

// Create the context
export const Context = createContext({ isAuth: false });

// Create the provider component
const ContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;