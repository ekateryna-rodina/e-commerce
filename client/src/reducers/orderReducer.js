import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
} from "../constants/types";
const initialOrderState = {
  orderInfo: {
    orderItems: [],
    shippingAddress: null,
    paymentMethod: "",
    itemsPrice: "",
    shippingPrice: "",
    taxPrice: "",
    total: "",
    successPayment: false,
    loadingPayment: false,
  },
  loading: true,
  error: null,
};
export const orderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        orderInfo: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        orderInfo: action.payload,
        success: true,
        loading: false,
      };
    case ORDER_DETAILS_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    case ORDER_PAY_REQUEST:
      return {
        ...state,
        loadingPayment: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        successPayment: true,
        loadingPayment: false,
      };
    case ORDER_PAY_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingPayment: false,
      };
    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};
