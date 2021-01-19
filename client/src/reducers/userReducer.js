import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_LOGOUT,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from "../constants/types";
const initialLoginRegisterState = {
  userInfo: null,
  error: null,
  loading: false,
};
const initialProfileState = {
  user: null,
  error: null,
  loading: false,
};
export const userReducer = (state = initialLoginRegisterState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        userInfo: null,
      };
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userProfileReducer = (state = initialProfileState, action) => {
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
    case USER_PROFILE_LOGOUT:
      return {
        loading: false,
        error: null,
        user: null,
      };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state = initialProfileState,
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

export default { userReducer, userProfileReducer, userUpdateProfileReducer };
