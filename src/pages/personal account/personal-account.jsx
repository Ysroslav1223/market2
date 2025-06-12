import { useEffect, useState } from "react"
import { Button } from "../../components/header/components/buttons"
import './personal-account.css'
import { IoExitOutline } from "react-icons/io5";
import { RenderContent } from "./components/render-content"
import { useNavigate } from "react-router-dom";
 import { useDispatch } from "react-redux";
import { setLogout } from "../../../action/set-logout";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getBasket } from "./components/get-basket";
import { setBasket } from "../../../action/set-basket";
import { setBuyBasket } from "../../../action/set-buy-basket";
import ROLE from '../../../constatns/ROLE'
import { selectUserRole } from "../../../selectors/select-user-role";


export const PersonalAccount=()=>{

      const location = useLocation();


    const params = new URLSearchParams(location.search);
    const initialSection = params.get('tab') || 'personal';

    const [activeSection, setActiveSection] = useState(initialSection);

    
    const navigate = useNavigate()
     const dispatch=useDispatch()
     const basket = useSelector(state=>state.basket)
     const roleId = useSelector(selectUserRole)

    const logout = ()=>{
        fetch('http://localhost:3000/logout', {
    method: 'POST',
    credentials: 'include' 
  })
  .then(res => res.json())
  .then(() => {
    sessionStorage.removeItem('userData')
     dispatch(setLogout())
    navigate('/');
  });
    }
    useEffect(()=>{
         const fetchBasket = async () => {
              try {
                const basketData = await getBasket(); 
                dispatch(setBasket(basketData));
              } catch (error) {
                console.error('Ошибка при загрузке корзины:', error);
              }
            };
        
            fetchBasket();
    },[dispatch])
    
    const [totalPrice, setTotalPrice] = useState(0);

useEffect(() => {
  const calculateTotal = () => {
    return basket.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/\s/g, ''), 10);
      return sum + price * item.count;
    }, 0);
  };
  
  setTotalPrice(calculateTotal());
}, [basket]);

const deleteBasket=()=>{
    fetch(`http://localhost:3000/deleteAll`,{
      method:"delete",
      credentials: 'include' 
    }).then(res=>res.json())
  }

const handleBuyWithoutLog=()=>{
  alert('Требуется авторизвция')
  navigate('/auth')
}
const handleBuyProducts=async()=>{
  setActiveSection('personal')
  const buyingProducts=await getBasket()
  dispatch(setBuyBasket(buyingProducts))
 deleteBasket(dispatch(setBasket([])))

  
}
    
    return(
        <div className="container">
            <div className="icon-container">
            <Link className="icon-main-page" to="/"><FaHouse/></Link>
            </div>
            <div className="buttonpers">
                <Button id={`us`} onClick={()=>setActiveSection('about')}>О нас</Button>
                <Button id={'person'} onClick={()=>setActiveSection('personal')}>Личный кабинет</Button>
              {roleId!==ROLE.GUEST?(
                <Button id={'acc'} onClick={()=>setActiveSection('profile')}>Профиль</Button>
              ):<Button id={'acc-close'}  disabled={true}>Профиль</Button>}
                
                <Button id={'shop'} onClick={()=>setActiveSection('bascket')}>Корзина</Button>

                {activeSection==='bascket'&&(
                    <div className="checkout-menu">
                        <h2 className="offer">К оформлению</h2>
                        <div className="list-goods">
                            <span>Стоимость товара :</span>
                           <span > {totalPrice.toLocaleString('ru-RU')} ₽</span>
                            </div>
                        <div className="total">
                            <span>Итого :</span>
                            <span className="total-price"> {totalPrice.toLocaleString('ru-RU')}₽ </span>
                        </div>
                        {roleId!==ROLE.GUEST?(
                          <button className="buy" onClick={handleBuyProducts}>купить</button>
                        ):<button className="buy" onClick={handleBuyWithoutLog}>купить</button>}
                    </div>
                )}
            </div>
            {activeSection!=='bascket'&&(<button className="exit" onClick={logout}>Выход<IoExitOutline className="icon-exit"/></button>
            )}
            <div className="persacc">
                {RenderContent(activeSection)}
            </div>
        </div>
    )
}