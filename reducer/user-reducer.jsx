import { ACTION_TYPE } from "../action/action-type";
import  ROLE  from "../constatns/ROLE";

const initialState = {
  id: null,
  email: null,
  name: null,
  password:null,
  roleId:ROLE.GUEST,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ACTION_TYPE.SET_LOGOUT:{
      return initialState
      
    }
    default:
      return state;
  }
};
