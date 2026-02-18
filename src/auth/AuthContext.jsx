import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/me")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload) => {
    const res = await api.post("/login", payload);

    localStorage.setItem("token", res.data.token);

    const userRes = await api.get("/me");
    setUser(userRes.data.user);
  };

  const register = async (form) => {
    setLoading(true);
    try {
      const res = await api.post("/register", form);
      return res.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await api.post("/logout");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
