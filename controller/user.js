import bcrypt from 'bcrypt'
import User from '../models/User.js'
import { generate } from '../helper/token.js'
import ROLE from '../constatns/ROLE.js'




export async function register(email,name,password){
    if(!password){
        throw new Error ('Password is empty')
    }
    const passwordHash = await bcrypt.hash(password,10)

    const user = await User.create({email,name,password:passwordHash})
    const token = generate({id:user.id})

    return {user,token}
}

export async function auth(email,password){
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Пользователь не найден')
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)

    if(!isPasswordMatch){
        throw new Error('Неверный пароль')
    }

    const token = generate({id:user.id})

    return {token,user}
}

export async function updatePass(email,password,newPassword,newPasschek){

    if(newPassword!==newPasschek){
        throw new Error('Новый пароль не совпадает с проверкой')
    }

    const user = await User.findOne({email})

     if(!user){
        throw new Error('Введите корректный email')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Старый пароль не верный')
    }

    const hashedNewPassword = await bcrypt.hash(newPassword,10)

    user.password =hashedNewPassword

    await user.save()

    return 'Пароль успешно обновлен';
}


export function getUser(){
    return User.find()
}

export function getRoles(){
    return [
        {id:ROLE.ADMIN,name:'Admin'},
        {id:ROLE.USER,name:'User'},
        {id:ROLE.GUEST,name:'Guest'}
    ]
}

export function deleteUser(id){
    return User.deleteOne({_id:id})
}

export function updateUser(id,userData){
    return User.findByIdAndUpdate(id,userData,{ReturnDocument:'after'})
}