import {} from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import caseReducer from "./case/caseReducer";
import userReducer from "./user/userReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  caseReducer,
  userReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
