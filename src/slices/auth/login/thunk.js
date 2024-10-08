import {
  loginSuccess,
  logoutUserSuccess,
  apiError,
  reset_login_flag,
} from "./reducer";
import axios from "axios";

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
    console.log("in the slice: ", user);
    let response = await axios.post(
      "http://localhost:5000/api/users/adminlogin",
      user
    );
    var data = response;
    if (data) {
      sessionStorage.setItem("authUser", JSON.stringify(data));
      dispatch(loginSuccess(data));
      console.log("the data: ", data);
      if (data.passwordUpdate) {
        if (data.roles == 0) {
          history("/dashboard");
        }
        if (data.roles == 2002) {
          history("/school");
        }
      } else {
        history("/update-password");
      }
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const changePassword = (password, history) => async (dispatch) => {
  try {
    console.log("I got the password and token, ", password);
    let response = await axios.post(
      "http://localhost:5000/api/users/adminlogin",
      password
    );
    if (response) {
      console.log("response: ", response);
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};
