import { ACTION_TYPE } from "../action/action-type";
import { ROLE } from "../src/components/ROLE";

const initialState = {
  id: null,
  email: null,
  name: null,
  password:null,
  roleId:ROLE.GUEST,
  session: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
