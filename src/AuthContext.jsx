import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (data) => {
    setUser(data);
  };

  const logout = () => {
    setUser(null);
    setMentorado(null);
    setMentorCompleto(null); // limpa também o mentor completo
  };

  return (
    <AuthContext.Provider value={{ user, mentorado, mentorCompleto, setMentorCompleto, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
