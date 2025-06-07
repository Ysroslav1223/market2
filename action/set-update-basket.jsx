import { ACTION_TYPE } from "./action-type";

export const setUpdateBasket=(productId,newCount)=>({
    type:ACTION_TYPE.UPDATE_BASKET,
    payload:{
        productId,
        newCount
    }
})