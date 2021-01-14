import { combineReducers } from "redux";
import { productListReducer } from "./productReducer";
import { productItemReducer } from "./productReducer";

export default combineReducers({
  productList: productListReducer,
  productItem: productItemReducer,
});
