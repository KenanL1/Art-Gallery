import { combineReducers } from "redux";
import PostReducer from "./postSlice";
import AuthReducer from "./authSlice";

const reducers = combineReducers({
  auth: AuthReducer,
  post: PostReducer,
});

export default reducers;
