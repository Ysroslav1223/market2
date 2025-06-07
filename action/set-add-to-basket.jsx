import { ACTION_TYPE } from "./action-type";

export const setAddBasket=(item)=>({
    type:ACTION_TYPE.ADD_TO_BASKET,
    payload:item, 
})