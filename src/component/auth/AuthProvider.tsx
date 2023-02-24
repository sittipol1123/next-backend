import { createContext, useState, useEffect, useContext } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  token: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const AuthContext = createContext<AuthContextProps>({
  authState: { user: null, loading: true },
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC = ({ children }: Props) => {
  // export const AuthProvider: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Check if user is already authenticated
    // and update the authState accordingly
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setAuthState({
        user: { id: "", email: "", token: userToken },
        loading: false,
      });
    } else {
      setAuthState({ user: null, loading: false });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("https://example.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      const user = { id: data.id, email: data.email, token: data.token };
      localStorage.setItem("userToken", user.token);
      setAuthState({ user, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    localStorage.removeItem("userToken");
    setAuthState({ user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
