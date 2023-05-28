import { useNavigate } from "react-router-dom"
import { setAuthToken } from "../../utils/auth";
import { useEffect } from "react";
import Notify from "../../utils/toast";
import { useUserContext, } from "../../context/userContext";


const Logout = () => {
  const { logoutUser } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      setAuthToken();
      Notify({ message: "Logout sucessfully", type: "success" });
      var current_url = window.location.href;
      console.log(current_url);
      logoutUser();
      navigate("/admin/login");
    } else {
      Notify({ message: "Already logged out", type: "info" });
      navigate("/admin/login");
    }
  }, [navigate]);
  return (
    <></>
  );
}

export default Logout;