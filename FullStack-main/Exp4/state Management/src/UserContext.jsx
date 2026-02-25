import React, { createContext, useState } from 'react';

// Step 2: Create the Context object
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("Guest");

  // Step 4: Function to update global state
  const updateUsername = (newName) => {
    setUser(newName);
  };

  return (
    // We pass both the value and the updater function into the provider
    <UserContext.Provider value={{ user, updateUsername }}>
      {children}
    </UserContext.Provider>
  );
};