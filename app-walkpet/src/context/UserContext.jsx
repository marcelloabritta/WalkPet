import { createContext, useContext, useState, useEffect } from "react";


const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser); 
    }
  }, []);

  const login = (userData) => {
    setUser(userData); 
    localStorage.setItem("loggedInUser", JSON.stringify(userData)); 
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser"); 
    setUser(null); 
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  return useContext(UserContext);
};


export { UserContext }; 
