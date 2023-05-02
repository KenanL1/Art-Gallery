import { combineReducers } from "redux";
import PostReducer from "./postSlice";
import AuthReducer from "./authSlice";
import ModalReducer from "./modalSlice";

const reducers = combineReducers({
  auth: AuthReducer,
  post: PostReducer,
  modal: ModalReducer,
});

export default reducers;
