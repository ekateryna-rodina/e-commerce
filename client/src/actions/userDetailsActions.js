import axios from "axios";
import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  SHIPPING_INFO_SAVE_REQUEST,
  USER_LOGIN_SUCCESS,
  SHIPPING_INFO_SAVE_SUCCESS,
  PAYMENT_METHOD_SAVE_SUCCESS,
} from "../constants/types";

// get user details
export const getBaseUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });
    const { userInfo } = getState().user;
    // // pass token as header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// update user details
export const updateBaseUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const { userInfo } = getState().user;
    // // pass token as header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put("/api/users/profile", user, config);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    // update header
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const saveShippingAddress = (shippingData) => async (dispath) => {
  //   const { data } = await axios.get(`/api/products/${id}`);
  console.log(shippingData);
  dispath({
    type: SHIPPING_INFO_SAVE_SUCCESS,
    payload: shippingData,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(shippingData));
};

export const savePaymentMethod = (paymentMethod) => async (dispath) => {
  dispath({
    type: PAYMENT_METHOD_SAVE_SUCCESS,
    payload: paymentMethod,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};
