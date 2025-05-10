import  jwt from "jsonwebtoken";
import User from "../models/User.js";



export default async function(req,res,next){
    
        const tokenData = jwt.verify(req.cookies.token,'testtest')

        const user = await User.findOne({_id: tokenData.id})

        if (!user){
            res.send({error:'Ошибка аунтификации'})
            return
        }
        req.user =user

        next()
}