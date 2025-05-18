import axios from "axios";
import React, { createContext, useEffect } from "react";

export const UserDataContext = createContext();
function userContext({ children }) {
  const [userData, setUserData] = React.useState({});
  const userToken = localStorage.getItem("Token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios(
          `${import.meta.env.VITE_BASE_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const data = response.data;
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userToken) {
      fetchUserData();
    }
  }, [userToken]);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}

export default userContext;
