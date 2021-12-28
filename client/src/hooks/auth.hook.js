import { useState, useEffect } from "react";
import { authKey, authUserId } from "../constants/cookies";
import { setCookie, deleteCookie, getCookie } from "../utils/cookiesUtils";

const useAuth = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const login = (jwtToken, id) => {
    const token = getCookie(authKey);
    if (!token) {
      setCookie(authKey, jwtToken, {
        "max-age": 3600,
      });
      setCookie(authUserId, id, {
        "max-age": 3600,
      });
    }
    setToken(jwtToken);
    setUserId(id);
  };

  const logout = () => {
    setToken("");
    setUserId("");
    deleteCookie(authKey);
    deleteCookie(authUserId);
  };

  useEffect(() => {
    const token = getCookie(authKey);
    const userId = getCookie(authUserId);
    if (userId !== "0" && token !== "0") {
      login(token, userId);
    } else {
      logout();
    }
  }, []);

  return { login, logout, token, userId };
};

export default useAuth;
