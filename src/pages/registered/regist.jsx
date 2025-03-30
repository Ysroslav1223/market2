import { sessions } from "../../components/sessions/sessions";
import { getUser } from "../authorize/get-user";
import { addUser } from "./add-user";

export const registed=async(regEmail,regName,regPassword)=>{
    const existedUser=await getUser(regEmail)

    if(existedUser){
        return{
            error:'Такой email занят',
            res:null
        }
    }
    const user=await addUser(regEmail,regName,regPassword)

    return{
        error:null,
        res:{
            id:user.id,
            email:user.email,
            roleId:user.role_id,
            name: user.name,
            session: sessions.create(user)
        }
    }
}