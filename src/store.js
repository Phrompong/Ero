import { createStore, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import Cookies from "js-cookie";

import userReducer from "./reducer/userReducer";

const reducers = combineReducers({
  user: userReducer,
});

const persistedState = Cookies.get("token")
  ? JSON.parse(Cookies.get("token"))
  : undefined;
const store = createStore(reducers, persistedState);

const makeStore = (context) => store;

export default store;
export const wrapper = createWrapper(makeStore);
