// import Cookies from "js-cookie";
// import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

// type AuthContextType = {
//   isAuthenticated: boolean;
//   setIsAuthenticated: (auth: boolean) => void;
//   token: string | null;
//   setToken: (value: string | null) => void;
//   logOut: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [token, setToken] = useState<string | null>(Cookies.get("token") || null);
//   const [isAuthenticated, setIsAuthenticated] = useState(!!token);
//   const [userId, setUserId] = useState<string | null>(Cookies.get('userId') || null);


//   useEffect(() => {
//     const storedToken = Cookies.get("token");
//     setIsAuthenticated(!!storedToken);
//     setToken(storedToken || null);
//   }, []);

//   const logOut = () => {
//     Cookies.remove("token");
//     Cookies.remove("role");
//     setIsAuthenticated(false);
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


import Cookies from "js-cookie";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  token: string | null;
  setToken: (value: string | null) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(Cookies.get("token") || null);
  const [userId, setUserId] = useState<string | null>(Cookies.get("userId") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUserId = Cookies.get("userId");
    
    setIsAuthenticated(!!storedToken);
    setToken(storedToken || null);
    setUserId(storedUserId || null);
  }, []);

  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { expires: 1 });
    } else {
      Cookies.remove("token");
    }

    if (userId) {
      Cookies.set("userId", userId, { expires: 1 });
    } else {
      Cookies.remove("userId");
    }
  }, [token, userId]);

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("role");
    setIsAuthenticated(false);
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken, userId, setUserId, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

