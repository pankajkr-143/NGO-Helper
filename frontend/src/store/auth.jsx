import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState("");
  const [supports, setSupports] = useState([]);

  const storetokenInLS = (token) => {
    setToken(token);
    return localStorage.setItem('token', token);
  };
  
  let isLoggedIn = !!token;
  console.log("isLoggedIn", isLoggedIn)
  
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
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
    if(!token) return;
    try{
      const response = await fetch("http://localhost:4000/support_By_Donating/support", {
        method: "GET",
      });

      if(response.ok){
        const data = await response.json();
        console.log(data.msg);
        setSupports(data.msg);
      }
    }catch(error){
      console.log(`services frontend error: ${error}`)
    }
  }


  
  // useEffect(() => {
  //   if(token) {
  //     getSupports();
  //     userAuthentication();
  //   }
  // }, [token]);

  useEffect(() => { 
    if (token) { 
      getSupports(); 
    } 
  }, [token]); 
  
  useEffect(() => { 
    if (token) { 
      userAuthentication(); 
    } 
  }, [token]);


  return (
    <AuthContext.Provider value={{ isLoggedIn, storetokenInLS, LogoutUser, user, supports }}>
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