import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/userReducer';
import { APP_API } from '../utils/auth';

const UserContext = createContext();

const API = "https://foodorderapp.jevin08.repl.co/api/v1/users"

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  isError: false,
  users: []
}

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const getUsers = async (url) => {
    dispatch({ type: "SET_LOADING" })
    try {
      const res = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const users = await res.data.users;
      dispatch({ type: "USERS", payload: users })
    }
    catch (error) {
      dispatch({ type: "ERROR" })
    }
  }

  const loginUser = async () => {
    dispatch({ type: "SET_LOGIN", });
  }
  const logoutUser = async () => {
    dispatch({ type: "SET_LOGOUT", });
  }

  useEffect(() => {
    getUsers(API);
    if (localStorage.getItem('token')) {
      loginUser();
    }
  }, [])

  return <UserContext.Provider value={{ ...state, getUsers, loginUser, logoutUser }}>
    {children}
  </UserContext.Provider>
}

const useUserContext = () => {
  return useContext(UserContext)
}

export { UserProvider, useUserContext };