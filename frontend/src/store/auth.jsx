import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [supports, setSupports] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const storeTokenInLS = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    console.log('Token stored:', newToken);
  };
  
  // let isLoggedIn = !!token;
  // console.log("isLoggedIn", isLoggedIn)
  
  const LogoutUser = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem("token");
    console.log('User logged out');
  };

  // JWT AUTHENTICATION --> to get currently loggedIN user data

  const userAuthentication = async() => {
    if (!token) return;
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

  };

  // donation support

  const getSupports = async() => {
    try{
      const response = await fetch("http://localhost:4000/support_By_Donating/support", {
        method: "GET",
      });

      if(response.ok){
        const data = await response.json();
        setSupports(data.msg);
      }
    }catch(error){
      console.log(`services frontend error: ${error}`)
    }
  };

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  useEffect(() => {
    getSupports();
    if(token) {
      userAuthentication();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, supports }}>
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
