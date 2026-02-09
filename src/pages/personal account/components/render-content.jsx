import { useSelector } from "react-redux"
import { selectUserName } from "../../../../selectors/select-user-name"
import "./render-content.css"
import { TextForUs } from "./text-for-us"
import { CardOfBasket } from "./card-of-basket"
import { getBasket } from "./get-basket"
import { useEffect } from "react"
import { setBasket } from "../../../../action/set-basket"
import { setUpdateBasket } from "../../../../action/set-update-basket"
import { useDispatch } from "react-redux"
import { setDeleteCardBasket } from "../../../../action/set-delete-card-basket"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"
import { useState } from "react"
import { AuthFormError } from "../../authorize/auth-error"







const updateFormScheme=yup.object().shape({
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
    newPassword: yup.string()
    .required('Заполните пароль')
    .matches(/^[\w#%]+$/,'Неверно заполнен пароль')
    .min(6)
    .max(30),
    newPasscheck: yup.string().required('Заполните повтор пароля')
    .oneOf([yup.ref('newPassword'),null],'Повтор пароля не совпадает')
})


export const RenderContent=(activeSection)=>{

       console.log('RenderContent RENDER');

       const dispatch = useDispatch()
       const basket = useSelector(state=>state.basket)
       const buyBasket =useSelector(state=>state.buy)


       console.log(buyBasket);

       const[serverError,setServerError]=useState('')


       const{register,handleSubmit,formState:{errors}}=useForm({
               defaultValues:{
                  email:"",
                  password:'',
                  newPassword:'',
                  newPasscheck:''
               },
               resolver: yupResolver(updateFormScheme)
           })

           const onSubmit=({email,password,newPassword,newPasscheck})=>{
            console.log(email,password,newPassword,newPasscheck)
            fetch(`http://localhost:3000/updatePass`,{
              method:"POST",
               headers:{
            "content-type":"application/json"
             },
              body:JSON.stringify({
                email: email,
                password: password,
                newPassword: newPassword,
                newPasscheck :newPasscheck
              }),
               credentials:'include',
            }).then(res=>res.json())
            .then((res)=>{
              if(res.error){
                setServerError(res.error);
              }else{
                alert('Пароль успешно сменен')
              }
            })
           }

            const formError=errors?.email?.message||errors?.newPassword?.message||errors?.password?.message||errors?.newPasscheck?.message
            const errorMessage = formError||serverError


       
           useEffect(() => {
    const fetchBasket = async () => {
      try {
        const basketData = await getBasket(); 
        dispatch(setBasket(basketData));
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error);
      }
    };

    fetchBasket();
  }, [dispatch]); 

   
    const nameUser=useSelector(selectUserName)
   


    const formatName=(name)=>{
        if(name!==null){
            const splitName=name.split(' ')
            const firstName=splitName[1]
            return firstName
        }else return
    }
    const firstName=formatName(nameUser)

   const handleCountChange = async(id,change) => {
     try {
    const currentItem = basket.find(item => item._id.toString() === id.toString());
    if (!currentItem) return;

    const newCount = currentItem.count + change;
    if (newCount < 1) return;

    dispatch(setUpdateBasket(id,newCount));


    await fetch("http://localhost:3000/update", {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: id,
        count: newCount
      }),
      credentials: 'include'
    });

    const updateData = await getBasket()

    dispatch(setBasket(updateData))

  } catch (error) {
    console.error("Update error:", error);
    const basketData = await getBasket();
    dispatch(setBasket(basketData));
  }
};
   const handleClickDelete = async (id) => {
  try {
    console.log(id);
    dispatch(setDeleteCardBasket(id));

    const response = await fetch('http://localhost:3000/delete', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: id }), 
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }
    const updatedBasket = await getBasket();
    dispatch(setBasket(updatedBasket));

  } catch (error) {
    console.error("Delete error:", error);

    const basketData = await getBasket();
    dispatch(setBasket(basketData));
  }
};
     const renderContent=()=>{
        switch(activeSection){
            case 'about': return <div className="content-section text">
                <TextForUs/>
                </div>
            case 'personal': return(<div className="content-section welcome">
                <h2>{`${firstName!==undefined?firstName:''} ${firstName===undefined?'Zstore, Привествует вас':', Приветсвуем'}`}</h2>
                <h3 className="ourbuy"> Ваши покупки:</h3>
                {firstName!==undefined?(
                  <div className="list-buy">
                  {buyBasket.map((item,idx)=>(
                    <CardOfBasket key={`${item.productId}_${idx}`} imgSrc={item.image} name={item.name} price={item.price} 
                     count={item.count} isPersonalAccount={true}/>
                  ))}
                </div>
                ):''}
            </div>
            )
            case 'profile':
                return(
                    <div className="content-section profile">
                        <h2 className="title-profile">Профиль</h2>
                        <form className="content-section profile" onSubmit={handleSubmit(onSubmit)}>
                        <span className="info-person">Изменить пароль</span>
                        <input className="int-data" placeholder="Email" {...register('email')}/>
                        <input className="int-data" type='password'placeholder="Старый пароль" {...register('password')}/>
                        <input className="int-data" type='password' placeholder="Новый пароль" {...register('newPassword')}/>
                        <input className="int-data"  type='password' placeholder="Новый пароль еще раз" {...register('newPasscheck')}/>
                         <div className="error">{errorMessage}</div>
                        <button className="save-btn">Сохранить изменения</button>
                        </form>
                    </div>
                )
            case 'bascket':
                return(
                    <div  className="content-section">
                        <div >{basket.map((item,idx)=>(
                            <CardOfBasket   key={`${item.productId}_${idx}`} imgSrc={item.image} name={item.name} price={item.price} onDelete={()=>handleClickDelete(item._id)}
                            onCountChange={(change)=>handleCountChange(item._id,change)} count={item.count}/>
                        ))}</div>
                    </div>
                )
            default:
                return <div>Выберите раздел</div>
        }
    }
    return renderContent(activeSection)
}