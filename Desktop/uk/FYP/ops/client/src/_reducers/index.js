import { combineReducers } from "redux";
import user from "./user_reducer";
import chat from "./chat_reducer";
import customer from "./customer_reducer";

const rootReducer = combineReducers({
  user,
  chat,
  customer,
});

export default rootReducer;
