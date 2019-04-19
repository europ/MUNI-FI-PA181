import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { reducer as form } from "redux-form";

import thunk from "redux-thunk";

export default function configureStore(initialState = {}) {
  const middlewares = [thunk];
  let composeEnhancers = compose;

  if (
    process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const finalCreateStore = composeEnhancers(applyMiddleware(...middlewares))(
    createStore
  );

  const store = finalCreateStore(combineReducers({ form }), initialState);

  return store;
}
