import { combineReducers } from "redux";
import { productListReducer } from "./productReducer";
import { productItemReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import {
  userReducer,
  userProfileReducer,
  userUpdateProfileReducer,
} from "./userReducer";

export default combineReducers({
  productList: productListReducer,
  productItem: productItemReducer,
  cart: cartReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
});
