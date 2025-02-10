import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./store/auth";

export const Logout = () => {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await LogoutUser();  // Clears auth state
      navigate("/");  // Redirects to home page
    };

    performLogout();
  }, [LogoutUser, navigate]);

  return null;
};
