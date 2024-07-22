import { combineReducers } from "redux";

import LayoutReducer from "./layouts/reducer";
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ProfileReducer from "./auth/profile/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import TodosReducer from "./todos/reducer";
import StudentReducer from "./students/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  Profile: ProfileReducer,
  ForgetPassword: ForgetPasswordReducer,
  Todos: TodosReducer,
  Students: StudentReducer,
});

export default rootReducer;
