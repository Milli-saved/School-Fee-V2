// action
import {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
  apiErrorChange,
} from "./reducer";

// Is user register successfull then direct plot user in redux.
export const registerUser = (user) => async (dispatch) => {
  try {
    let response = {
      username: "Millio Tenkir",
      password: "hello",
    };

    const data = response;
    if (data) {
      dispatch(registerUserSuccessful(data));
    }
  } catch (error) {
    dispatch(registerUserFailed(error));
  }
};

export const resetRegisterFlag = () => {
  try {
    const response = resetRegisterFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};

export const apiError = () => {
  try {
    const response = apiErrorChange();
    return response;
  } catch (error) {
    return error;
  }
};
