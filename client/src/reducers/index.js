import { combineReducers } from "redux";
import { productListReducer } from "./productReducer";
import { productItemReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { orderReducer } from "./orderReducer";
import {
  baseUserProfileReducer,
  paymentReducer,
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
  userPaymentDetails: paymentReducer,
  order: orderReducer,
});
