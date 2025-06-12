import { ACTION_TYPE } from "./action-type";

export const setBuyBasket=(goods)=>({
    type:ACTION_TYPE.SET_BUY_BASKET,
    payload:goods, 
})