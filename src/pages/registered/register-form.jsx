import { useForm } from "react-hook-form";
import { Button } from "../../components/header/components/buttons"
import '../authorize/authorize-from.css'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../action/set-user";
import { useNavigate } from "react-router-dom";
import { AuthFormError } from "../authorize/auth-error";
import {registed} from './regist'


const regFormScheme=yup.object().shape({
    name: yup.string()
    .required('Заполните ФИО')
    .matches(/^[A-Za-zА-Яа-яЁё\s]+$/, 'Можно вводить только буквы')
    .min(10)
    .max(60),
    email: yup
    .string()
    .email('Введите корректный email') 
    .required('Заполните email') 
    .max(50, 'Email не может содержать более 50 символов'),
    password: yup.string()
    .required('Заполните пароль')
    .matches(/^[\w#%]+$/,'Неверно заполнен пароль')
    .min(6)
    .max(30),
    passcheck: yup.string().required('Заполните повтор пароля')
    .oneOf([yup.ref('password'),null],'Повтор пароля не совпадает')
})


export const RegisterForm=()=>{

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [serverError, setServerError] = useState(null);


    const{register,handleSubmit,formState:{errors}}=useForm({
        defaultValues:{
            email:'',
            name:'',
            password:'',
            passcheck:''
        },
        resolver: yupResolver(regFormScheme)
    })

    const onSumit=({email,name,password})=>{
        registed(email,name,password).then(({error,res})=>{
            if(error){
                setServerError(`${error}`)
                return
            }
            dispatch(setUser(res))

            if(res!==null){
                navigate('/')
    
            }
        })
    }
  

    const formError=errors?.password?.message||errors?.passcheck?.message||errors?.name?.message||errors?.email?.message
    const errorMessage = formError||serverError

    return(
        <div className="main-form">
            <h2 className="title-name">Регистрация</h2>
            <form className="auth" onSubmit={handleSubmit(onSumit)}>
                <div className="input-row">
                <input type="password" className="regist-password"placeholder="Пароль"{...register('password')}/>
                <input type='password' className="regist-second-password"placeholder="Повторный пароль"{...register('passcheck')}/>
                </div>
                <h3>Ваши Данные</h3>
                <input type="text" className="login-password" placeholder="ФИО" {...register('name')}/>
                <input type="text" className="login-password"placeholder="Email"{...register('email')}/>
                {errorMessage&&<AuthFormError>{errorMessage}</AuthFormError>}
                <Button id={'auth-entry'}>Отправить</Button>
            </form>
        </div>
    )
}