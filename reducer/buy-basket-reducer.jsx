import { ACTION_TYPE } from "../action/action-type";

const initialState = JSON.parse(localStorage.getItem('buyBasketState'))||[]

export const buyBasketReducer = (state = initialState, action) => {
  switch (action.type) {
   case ACTION_TYPE.SET_BUY_BASKET:{
      const updatedState = action.payload;
            localStorage.setItem('buyBasketState', JSON.stringify(updatedState)); 
            return updatedState
   }
    default:
      return state;
  }
};
