import { ACTION_TYPE } from "../action/action-type";

const initialState = []

export const searchProductsReducer = (state = initialState, action) => {
  switch (action.type) {
   case ACTION_TYPE.SET_SEARCH_PRODUCTS:{
    return{
        ...state,
        ...action.payload
    }
   }
    default:
      return state;
  }
};
