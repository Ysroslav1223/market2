import { Link, useParams } from 'react-router-dom'
import { Button } from '../../../components/header/components/buttons'
import { useDispatch } from 'react-redux'
import { setAddBasket } from '../../../../action/set-add-to-basket'
import './product-card.css'
import { Footer } from '../../../components/footer/footer'
import { useNavigate } from 'react-router-dom'
export const ProductCard=({imgSrc,name,price})=>{

  const {id}=useParams()
  const dispatch=useDispatch()
  const navigate=useNavigate()

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
        dispatch(setAddBasket(res.basket.item));
  }})
.catch(err => {
    alert("Ошибка запроса: " + err.message);
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
    <h2 className="title-product">{name}</h2>
    <div className="attribute">
      <div className="price-row">
        <span className='title-price'>Цена</span>
        <h2 className="price">{price} ₽</h2>
      </div>
    </div>
    <div className="action-btns">
      <Button id={'buy'} onClick={addProduct}>Купить</Button>
      <Button id={'trash-product'}>В корзину</Button>
    </div>
  </div>
</div>
<Footer/>
</div>

    )
}