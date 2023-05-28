
const UserReducer = (state, action) => {
 
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      }
    case "SET_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      }
    case "SET_LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
      }  
    case "USERS":
      return {
        ...state,
        isLoading: false,
        users: action.payload
      }

    case "ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      }

    default:
      return {
        ...state,
      }
  }
}

export default UserReducer;