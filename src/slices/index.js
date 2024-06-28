import { combineReducers } from "redux";

import LayoutReducer from "./layouts/reducer";
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
});

export default rootReducer;
