import { useEffect } from "react";
import { useAuth } from "./store/auth";
import { useNavigate } from "react-router-dom"; 

export const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout(); 
      navigate("/login");
      window.location.reload();
    };

    performLogout();
  }, [logout, navigate]);

  return ;
};
