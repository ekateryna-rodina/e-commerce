import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_ITEM_REQUEST,
  PRODUCT_ITEM_SUCCESS,
  PRODUCT_ITEM_FAIL,
} from "../constants/types";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ITEM_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_ITEM_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_ITEM_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
