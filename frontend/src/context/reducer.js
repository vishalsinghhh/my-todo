import {
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    LOGOUT_USER
  } from "./actions";
  
  const reducer = (state, action) => {
    if (action.type === SETUP_USER_BEGIN) {
      return { ...state, isLoading: true };
    }
    if (action.type === SETUP_USER_SUCCESS) {
      return {
        ...state,
        isLoading: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    }
    if (action.type === SETUP_USER_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }
    if (action.type === LOGOUT_USER) {
      return {
        ...state,
        user: null,
        token: null
      }
    }
  };
  
  export default reducer;
  