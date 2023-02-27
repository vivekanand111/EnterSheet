import { combineReducers, configureStore, } from '@reduxjs/toolkit'
import setAuthToken from '../utils/setAuthToken'
import { tasksReducer } from './tasksSlice'


const appReducer = combineReducers({
  storeData: tasksReducer,
})

export const rootReducer = (state, action) => {
  if (action.type === 'EMPTY_STORE') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
})

let currentState = store.getState().storeData;

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  const previousState = currentState;
  currentState = store.getState().storeData;
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth &&
    previousState.auth.token &&
    previousState.auth.token !== currentState.auth?.token) {
    const token = currentState.auth?.token;
    setAuthToken(token);
  }
});

export default store
