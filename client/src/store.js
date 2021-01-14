import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";

const initialState = {};
const middleware = [thunk];
const devtools = composeWithDevTools(applyMiddleware(...middleware));
const store = createStore(rootReducer, initialState, devtools);

export default store;
