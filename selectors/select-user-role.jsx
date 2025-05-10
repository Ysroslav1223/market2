import ROLE from "../constatns/ROLE";
export const selectUserRole=({user})=> user ? user.roleId : ROLE.GUEST;