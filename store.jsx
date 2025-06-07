import { userReducer } from "./reducer/user-reducer";
import {basketReducer}from './reducer/basket-reducer'
import { searchProductsReducer } from "./reducer/search-products-reducer";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { thunk } from "redux-thunk";


const reducer = combineReducers({
  user: userReducer,
  basket: basketReducer,
  research:searchProductsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
