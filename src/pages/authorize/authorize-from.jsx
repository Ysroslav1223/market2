import './authorize-from.css'
import { Link,Navigate } from 'react-router-dom'
import { Button } from '../../components/header/components/buttons'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthFormError } from './auth-error'
import { useNavigate } from 'react-router-dom'

import  ROLE  from '../../../constatns/ROLE'
import { authEntry } from '../../../utils/authEntry'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../action/set-user'



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


    const navigate = useNavigate()
    const dispatch = useDispatch()

   

    const {register,handleSubmit,formState:{errors}}=useForm({
        defaultValues:{
            email:'',
            password:''
        },
        resolver:yupResolver(authFormScheme)
    })

    const[serverError,setServerError]=useState('')

   const onSubmit = ({email, password}) => {
  authEntry('http://localhost:3000/auth', "POST", {email, password})
    .then(data => {
      if (data.error) {
        setServerError(data.error);
        console.log('ошибка входа');
        return;
      }
      console.log(data);
      sessionStorage.setItem('userData', JSON.stringify(data.user));
      dispatch(setUser(data.user))
      navigate('/');
    })
    .catch(error => {
      setServerError(error.message);
      console.log('ошибка входа');
    });
}

    const formError=errors?.password?.message||errors?.name?.message||errors?.email?.message
    const errorMessage = formError||serverError


    return(
        <div className='main-form'>
            <h2 className='title-name'>Вход</h2>
            <form  className="auth" onSubmit={handleSubmit(onSubmit)}>
                <input type='text' className='login-password' placeholder="Введите email..."{...register('email')}/>
                <input type='password' className='login-password'placeholder="Введите пароль..."{...register('password')}/>
                <Link className='forgot-password'>Забыли пароль?</Link>
                <Button id={'auth-entry'}>Войти</Button>
                <Link to='/regist'><Button id={'auth-regist'}>Регистрация</Button></Link>
                {errorMessage&&<AuthFormError>{errorMessage}</AuthFormError>}
            </form>
        </div>
    )
}