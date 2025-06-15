import { Link, useParams } from 'react-router-dom'
import { Button } from '../../../components/header/components/buttons'
import { useDispatch } from 'react-redux'
import { setAddBasket } from '../../../../action/set-add-to-basket'
import './product-card.css'
import { Footer } from '../../../components/footer/footer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../../../../selectors/select-user-role'

export const ProductCard=({imgSrc,name,price})=>{

  const {id}=useParams()
  const roleId = useSelector(selectUserRole)
  const dispatch=useDispatch()
  const navigate=useNavigate()
   const [names, setName] = useState(""); 
   const [prices, setPrice] = useState(""); 
   const isEditMode = window.location.pathname.includes("update");
   const formatPrice = (price) => {

  return new Intl.NumberFormat('ru-RU').format(price);
};

  const addProduct=()=>{
   fetch('http://localhost:3000/add', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ productId: id})
})
.then(res => res.json())
.then(res => {
    if (res && res.basket && res.basket.item) {
        dispatch(setAddBasket(res.basket.item))
    if(roleId===2){
      navigate('/auth')
    }
  }})
.catch(err => {
    alert(`Ошибка: ${err.message}`);
});
  }
      const handleSave = (id,names,prices)=>{
        console.log(id,names,prices);
          fetch(`http://localhost:3000/updateCard`,{
              method:'PUT',
              headers:{
                      'Content-Type': 'application/json'
                  },
                    credentials: 'include',
                  body: JSON.stringify({id,name:names,price:prices})
          }).then((res)=>res.json())
           .then((data) => {
      console.log("Успешно обновлено", data.updatedFields
);
      alert("Изменения сохранены!");
    })
    .catch((err) => {
      console.error("Ошибка обновления", err);
      alert("Не удалось сохранить изменения!");
    });
      }
     

      

  const returnNavigate=()=>{
    navigate(-1)
  }

    return(
      <div>
        <div className='routing-product-page'>
          <Link className='product-routing ' to='/'>Главная  страница </Link>
          <span>/</span>
          <Link className='product-routing' onClick={returnNavigate}>Смартфоны Apple</Link>
        </div>
        
    <div className="card-product">
  <div className="card-img-wrapper">
    <img src={imgSrc} className="product-img" alt={name} />
  </div>
  <div className="card-info">
    {!isEditMode?<h2 className="title-product">{name}</h2>:
    <div>
      <input className='name-input' placeholder={name} value={names} onChange={(e)=>setName(e.target.value)} />
      </div>}
    <div className="attribute">
      <div className="price-row">
        <span className='title-price'>Цена</span>
         {!isEditMode? <h2 className="price">{price} ₽</h2>:
        <div>
          <input className='price-input' placeholder={`${price} ₽`} value={prices} onChange={(e)=> {
            const rawValue = e.target.value.replace(/\D/g, '')
            const formattedValue = formatPrice(rawValue); 
          setPrice(formattedValue);
            }} />
          </div>}
      </div>
    </div>
    {!isEditMode? <div className="action-btns">
     
      <Button id={'buy'} onClick={addProduct}>Купить</Button>
      <Button id={'trash-product'}>В корзину</Button>
    </div>:
    <div>
      <button className='save' onClick={()=>handleSave(id,names,prices)}>Сохранить изменения</button>
      </div>}
  </div>
</div>
<Footer/>
</div>

    )
}