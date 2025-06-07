import { ACTION_TYPE } from "./action-type";

export const setSearchProducts=(products)=>({
    type:ACTION_TYPE.SET_SEARCH_PRODUCTS,
    payload:products, 
})