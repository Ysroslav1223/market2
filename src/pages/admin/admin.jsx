import './admin.css'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';
import { AuthFormError } from '../authorize/auth-error';
import { Link, Navigate } from 'react-router-dom';



const postAddScheme = yup.object().shape({
    name:yup.string()
    .required('Заполните навзание') 
    .max(50, 'Название не может содержать более 50 символов'),
    price:yup.string()
    .required('Заполните цену')
    .max(7),
    category: yup.string()
    .required('Заполните категорию ')
    .max(10),
    image: yup.string()
    .required('Добавьте URL изображения')
    .url('Введите корректный URL изображения'),
    generation: yup.number()
    .required('Заполните поколение')
    .max(100)
})

export const Admin =()=>{

    const[serverError,setServerError]=useState('')



    const {register,handleSubmit,formState:{errors}}=useForm({
           defaultValues:{
              name:'',
              category:'',
              image:'',
              generation: 0
           },
           resolver:yupResolver(postAddScheme)
       })

       const onSubmit = ({name,price,category,image,generation})=>{
        console.log({name});
        try{

            fetch(`http://localhost:3000/addPost`,{
                method:"POST",
                headers:{
                     "content-type":"application/json"
                },
                   credentials:'include',
                   body: JSON.stringify({
                    name:name,
                    price:price,
                    category:category,
                    image:image,
                    generation: generation
                   })
            }).then((res)=>res.json())
        }catch(e){
            if(e.error){
                setServerError(e.message)
            }
        }
       }
       const formError=errors?.password?.message||errors?.name?.message||errors?.email?.message
        const errorMessage = formError||serverError

        return(
            <div>
                <div className='link-control'>
                    <Link className='main-page-link' to='/'>Главная страница/</Link>
                    <Link className='setting-person' to='/personAcc'>Пользователь/</Link>
                    <Link className='list-of-all' to="/posts/allProducts">Список всех товаров</Link>
                </div>
                
                   
                <div>
                    <h2 className='add-title'>Добавление товара</h2>
                </div>
                <form className="setting-control" onSubmit={handleSubmit(onSubmit)}>
                    <div className="name">
                        <label>Название товара:</label>
                        <input className='name-input' {...register('name')}/>
                    </div>
                    <div className="price-goods">
                        <label>Цена товара:</label>
                        <input className='price-input' {...register('price')}/>
                    </div >
                    <div className="category">
                       <label>Категория товара:</label> 
                        <input className='category-input' {...register('category')}/>
                    </div>
                    <div className="image">
                        <label>Картинка товара URL</label>
                        <input className='image-input' {...register('image')}/>
                    </div>
                    <div className="generation">
                        <label>Поколение товара:</label>
                        <input className='generation-input' {...register('generation')}/>
                    </div>
                    {errorMessage&&<AuthFormError>{errorMessage}</AuthFormError>}
                 <button className='add-posts' type='submit'>Добавить</button>
                </form>
                <div>
                    <h2 className='title-add-example'>Пример добавления товара</h2>
                    <div className='setting-expamle'>
                        <div className="name">
                        <label>Название товара:</label>
                        <input className='name-input' placeholder='Apple Iphone' disabled={true}/>
                    </div>
                    <div className="price-goods">
                        <label>Цена товара:</label>
                        <input className='price-input' placeholder='52 490' disabled={true}/>
                    </div >
                    <div className="category">
                       <label>Категория товара:</label> 
                        <input className='category-input' placeholder='smartphone' disabled={true}/>
                    </div>
                    <div className="image">
                        <label>Картинка товара URL</label>
                        <input className='image-input' placeholder='https://i.ibb.co/wh8YSFMV/Group-1-Photoroom.png' disabled={true}/>
                    </div>
                    <div className="generation">
                        <label>Поколение товара:</label>
                        <input className='generation-input' placeholder='16' disabled={true}/>
                    </div>
                    </div>
                </div>
            </div>
        )
}