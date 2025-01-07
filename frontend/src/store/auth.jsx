import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const storetokenInLS = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const LogoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, storetokenInLS, LogoutUser }}>
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