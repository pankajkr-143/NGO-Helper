import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const storetokenInLS = (token) => {
    return localStorage.setItem('token', token);
    // setToken(token);
  };
  
  let isLoggedIn = !!token;
  console.log("isLoggedIn", isLoggedIn)
  
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // JWT AUTHENTICATION --> to get currently loggedIN user data

  const userAuthentication = async() => {
    try{
      const response = await fetch("http://localhost:4000/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response.ok){
        const data = await response.json();
        console.log('user data', data.userData);
        setUser(data.userData);
      }
    }catch(error){
      console.log("Error fetching user data")
    }

  }
  useEffect(() => {
    userAuthentication();
  }, []);


  return (
    <AuthContext.Provider value={{ isLoggedIn, storetokenInLS, LogoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return authContextValue;
};