import { combineReducers } from "redux";
import PostReducer from "./postSlice";
import AuthReducer from "./authSlice";
import ModalReducer from "./modalSlice";
import themeReducer from "./themeSlice";

const reducers = combineReducers({
  auth: AuthReducer,
  post: PostReducer,
  modal: ModalReducer,
  theme: themeReducer,
});

export default reducers;
