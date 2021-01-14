import { combineReducers } from "redux";
import { productListReducer } from "./productReducer";
import { productItemReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";

export default combineReducers({
  productList: productListReducer,
  productItem: productItemReducer,
  cart: cartReducer,
});
