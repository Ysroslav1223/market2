
import { ACTION_TYPE } from "../action/action-type";

const initialState = []

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_BASKET:
      return action.payload;

    case ACTION_TYPE.UPDATE_BASKET:
      return state.map(item=>
        item.id===action.payload.productId
        ?{...item,count:action.payload.newCount}:item
      )

      case ACTION_TYPE.SET_DELETE_CARD_BASKET:
       return state.filter(
                item => item.id !== action.payload
            );
    default:
      return state;
  }
};
