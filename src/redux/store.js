import {} from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import caseReducer from "./case/caseReducer";
import { thunk } from "redux-thunk";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  caseReducer,
  authReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
