import { ACTION_TYPE } from "./action-type";

export const setDeleteCardBasket=(productId)=>({
    type:ACTION_TYPE.SET_DELETE_CARD_BASKET,
    payload: productId
})