import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";

import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  CHANGE_DATA
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  currData:null
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: `/api/v1`,
  });

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const setupUser = async (currentUser, endPoint) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response?.data?.msg },
      });
    }
  };

  const getAllLists = async () => {
    try {
      const res = await authFetch.get("list");
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const createList = async (name) => {
    try {
      const res = await authFetch.post("/list", { name });
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const createTask = async (listId, description) => {
    try {
      const res = await authFetch.post("/task", { listId, description });
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getTasksByListID = async (id) => {
    try {
      const res = await authFetch.get(`/task/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const transferTask = async (taskId, newListId) => {
    try {
      const res = await authFetch.patch(`/task`, { taskId, newListId });
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const changeData = (data)=>{
    dispatch({ type: CHANGE_DATA, payload: { data } });
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setupUser,
        logoutUser,
        getAllLists,
        createList,
        createTask,
        transferTask,
        changeData,
        getTasksByListID,
      }}
    >
      <div>{children}</div>
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
