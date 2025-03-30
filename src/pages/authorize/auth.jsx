import { getUser } from "./get-user"
import { sessions } from "../../components/sessions/sessions"


export const authorize=async(authEmail,authPassword)=>{
    
    const user=await getUser(authEmail)
    

    if(!user){
        return{
            error:"Такой пользователь не найден",
            res:null
        }
    }

    const {id,email,password,roleId,name}=user
    if(authPassword!==password){
        return{
            error:'неверный пароль',
            res:null
        }
    }
    return{
        error:null,
        res:{
            id,
            name,
            email,
            roleId,
            session: sessions.create(user)
        }
    }
}