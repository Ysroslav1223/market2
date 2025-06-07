import { ACTION_TYPE } from "./action-type";

export const setBasket=(goods)=>({
    type:ACTION_TYPE.SET_BASKET,
    payload:goods, 
})