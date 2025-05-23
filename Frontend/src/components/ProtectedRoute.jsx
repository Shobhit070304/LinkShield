import React, { useContext, useEffect } from "react";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { userData } = useContext(UserDataContext);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [userToken, navigate]);
  return (
    <div>
      {userData ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">
            Please login to access this page
          </h1>
          <p className="mt-4 text-gray-600">
            You will be redirected to the login page.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProtectedRoute;
