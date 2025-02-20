import {} from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import caseReducer from "./case/caseReducer";
import { thunk } from "redux-thunk";
import authReducer from "./auth/authReducer";
import { allUserReducer } from "./users/userReducer";
import { allBankReducer } from "./banks/bankReducer";
import { allFieldExecutiveReducer } from "./fieldExecutive/filedExecutiveReducer";
import { profileReducer } from "./profile/profileReducer";
import adminReducer from "./dashboard/admin/adminReducer";
import locationReducer from "./location/locationReducer";
import coordinatorReducer from "./dashboard/coordinator/coordinator.Reducer";
import supervisorReducer from "./supervisor/supervisorReducer";

const rootReducer = combineReducers({
  caseReducer,
  authReducer,
  allUserReducer,
  allBankReducer,
  allFieldExecutiveReducer,
  profileReducer,
  adminReducer,
  coordinatorReducer,
  locationReducer,
  supervisorReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
