import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, SET_ALERT } from "./types";

// get current user profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.msg
          ? error.response.data.msg
          : error.responseText,
        status: error.response.status
      }
    });
  }
};

// create or update a profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post("/api/profile/", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert(edit ? "Profile updated" : "Profile created", success));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.msg
          ? error.response.data.msg
          : error.responseText,
        status: error.response.status
      }
    });
  }
};
