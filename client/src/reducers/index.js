import { combineReducers } from "redux";
import { productListReducer } from "./productReducer";
import { productItemReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import {
  baseUserProfileReducer,
  updateBaseUserProfileReducer,
  userShippingDetailsReducer,
} from "./userDetailsReducer";

export default combineReducers({
  productList: productListReducer,
  productItem: productItemReducer,
  cart: cartReducer,
  user: authReducer,
  userProfile: baseUserProfileReducer,
  userUpdateProfile: updateBaseUserProfileReducer,
  userShippingDetails: userShippingDetailsReducer,
});
