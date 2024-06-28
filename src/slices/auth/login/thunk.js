import {
  loginSuccess,
  logoutUserSuccess,
  apiError,
  reset_login_flag,
} from "./reducer";

export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const socialLogin = (type, history) => async (dispatch) => {
  try {
    let response = {
      email: "milliontenkir@gmail.com",
      user: "Million Tenkir",
    };
    sessionStorage.setItem("authUser", JSON.stringify(response));
    dispatch(loginSuccess(response));
    history("/dashboard");
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    let response = {
      email: "milliontenkir@gmail.com",
      user: "Million Tenkir",
    };
    sessionStorage.removeItem("authUser");
    dispatch(logoutUserSuccess(response));
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const loginUser = (user, history) => async (dispatch) => {
  try {
    let response = {
      email: user.email,
      password: user.password,
    };
    var data = response;
    if (data) {
      sessionStorage.setItem("authUser", JSON.stringify(data));
      var finallogin = JSON.stringify(data);
      finallogin = JSON.parse(finallogin);
      data = finallogin.data;
      dispatch(loginSuccess(data));
      history("/dashboard");
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};
