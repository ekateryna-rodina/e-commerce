import {
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  SHIPPING_INFO_SAVE_REQUEST,
  SHIPPING_INFO_SAVE_SUCCESS,
  PAYMENT_METHOD_SAVE_SUCCESS,
} from "../constants/types";
const initialBaseProfileState = {
  user: null,
  error: null,
  loading: false,
};
const initialShippingState = {
  shippingAddress: {
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
  loading: false,
};

const initialPaymentState = {
  paymentMethod: null,
};

export const baseUserProfileReducer = (
  state = initialBaseProfileState,
  action
) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_PROFILE_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_PROFILE_RESET:
      return {
        loading: false,
        error: null,
        user: null,
      };
    default:
      return state;
  }
};

export const updateBaseUserProfileReducer = (
  state = initialBaseProfileState,
  action
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_PROFILE_RESET:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const userShippingDetailsReducer = (
  state = initialShippingState,
  action
) => {
  switch (action.type) {
    case SHIPPING_INFO_SAVE_REQUEST:
      console.log("request");
      return {
        ...state,
        loading: true,
      };
    case SHIPPING_INFO_SAVE_SUCCESS:
      console.log("success");
      console.log(action.payload);
      return {
        shippingAddress: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const paymentReducer = (state = initialPaymentState, action) => {
  switch (action.type) {
    case PAYMENT_METHOD_SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};

export default {
  baseUserProfileReducer,
  updateBaseUserProfileReducer,
  userShippingDetailsReducer,
  paymentReducer,
};
