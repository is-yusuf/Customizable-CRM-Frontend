import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type AuthContextType = {
  isAuthorized: boolean;
  token: string | null;
  signIn: (
    token: string,
    username: string,
    email?: string,
    profileImageUrl?: string
  ) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const isAuthorized = JSON.parse(localStorage.getItem("isAuthorized"));
    if (isAuthorized) {
      setIsAuthorized(isAuthorized);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isAuthorized", JSON.stringify(isAuthorized));
  }, [isAuthorized]);

  const signIn = (
    token: string,
    username: string,
    email?: string,
    profileImageUrl?: string
  ) => {
    setIsAuthorized(true);
    // setToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("profileimage", profileImageUrl);

    console.log("Signed in successfully");
  };
  const navigate = useNavigate();

  const signOut = () => {
    setIsAuthorized(false);
    setToken(null);
    Cookies.remove("jwt");
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    console.log("Signed out successfully");
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, token, signIn, signOut }}>
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
