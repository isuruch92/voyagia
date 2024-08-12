import {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
} from "react";

const LOCAL_STORAGE_USERNAME = "voyagia-user";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      localStorage.setItem(
        LOCAL_STORAGE_USERNAME,
        JSON.stringify(action.payload)
      );
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case "login-error":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case "logout":
      localStorage.removeItem(LOCAL_STORAGE_USERNAME);
      return { ...state, user: null, isAuthenticated: false, error: null };
    case "load-user":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload, // Set to true if user exists in local storage
      };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Isuru",
  email: "isuru922@hotmail.com",
  password: "qwerty@123",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [loading, setLoading] = useState(true); // Add loading state

  // Load user from localStorage when the app initializes
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERNAME));
    if (storedUser) {
      dispatch({ type: "load-user", payload: storedUser });
    }
    setLoading(false); // Set loading to false after user is loaded
  }, []);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      dispatch({
        type: "login-error",
        payload: "Username or Password does not match",
      });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
