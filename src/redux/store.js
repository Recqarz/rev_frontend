import {} from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import caseReducer from './case/caseReducer'
import { thunk } from 'redux-thunk'
import authReducer from './auth/authReducer'
import { allUserReducer } from './users/userReducer'
import { allBankReducer } from './banks/bankReducer'

const rootReducer = combineReducers({
  caseReducer,
  authReducer,
  allUserReducer,
  allBankReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
