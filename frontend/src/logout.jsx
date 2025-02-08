import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./store/auth";

export const Logout = () => {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await LogoutUser();
      navigate("/login");
    };

    performLogout();
  }, [LogoutUser, navigate]);

  return null;
};
