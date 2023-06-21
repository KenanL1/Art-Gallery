import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store";
import { selectIsLoggedIn } from "../store/Reducers/authSlice";
import { logout } from "../store/Reducers/authSlice";

// Routes that need authentication to access
const ProtectedRoute = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const checkUserToken = () => {
    const userToken = localStorage.getItem("user");
    if (!userToken) {
      dispatch(logout());
      return navigate("/login");
    }
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return <>{isLoggedIn ? props.children : null}</>;
};

export default ProtectedRoute;
