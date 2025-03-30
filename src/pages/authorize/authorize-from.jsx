import './authorize-from.css'
import { Link,Navigate } from 'react-router-dom'
import { Button } from '../../components/header/components/buttons'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { authorize } from './auth'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../action/set-user'
import { useState } from 'react'
import { AuthFormError } from './auth-error'
import { selectUserRole } from '../../../selectors/select-user-role'
import { ROLE } from '../../components/ROLE'



const authFormScheme=yup.object().shape({
    email: yup
    .string()
    .email('Введите корректный email') 
    .required('Заполните email') 
    .max(50, 'Email не может содержать более 50 символов'),
    password: yup
    .string()
    .required('Заполните пароль')
    .matches(/^[\w#%]+$/,"Неверно заполнен пароль")
    .min(6)
    .max(30)
})


export const AuthorizeFrom=()=>{
    const roleId=useSelector(selectUserRole)
    const[serverError,setServerError]=useState(null)
    const dispatch=useDispatch()


   

    const {register,handleSubmit,formState:{errors}}=useForm({
        defaultValues:{
            email:'',
            password:''
        },
        resolver:yupResolver(authFormScheme)
    })

    const onSubmit=({email,password})=>{
        authorize(email,password).then(({error,res})=>{
            if(error){
                setServerError(`${error}`)
            }
            dispatch(setUser(res))
        })
    }


    const formError=errors?.email?.message||errors?.password?.message
    const errorMessage = formError||serverError

    if(roleId!==ROLE.GUEST){
        return <Navigate to='/'/>
    }

    return(
        <div className='main-form'>
            <h2 className='title-name'>Вход</h2>
            <form  className="auth" onSubmit={handleSubmit(onSubmit)}>
                <input type='text' className='login-password' placeholder="Введите email..."{...register('email')}/>
                <input type='password' className='login-password'placeholder="Введите пароль..."{...register('password')}/>
                <Link className='forgot-password'>Забыли пароль?</Link>
                <Button id={'auth-entry'}>Войти</Button>
                {errorMessage&&<AuthFormError>{errorMessage}</AuthFormError>}
                <Link to='/regist'><Button id={'auth-regist'}>Регистрация</Button></Link>
            </form>
        </div>
    )
}