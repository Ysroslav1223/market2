import { useState } from "react"
import { Button } from "../../components/header/components/buttons"
import './personal-account.css'
import { IoExitOutline } from "react-icons/io5";
import { RenderContent } from "./components/render-content"
import { useNavigate } from "react-router-dom";
 import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { setLogout } from "../../../action/set-logout";

export const PersonalAccount=()=>{

    const[activeSection,setActiveSection]=useState('profile')
    const navigate = useNavigate()
     const dispatch=useDispatch()

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

    return(
        <div className="container">
            <div className="buttonpers">
                <Button id={`us`} onClick={()=>setActiveSection('about')}>О нас</Button>
                <Button id={'person'} onClick={()=>setActiveSection('personal')}>Личный кабинет</Button>
                <Button id={'acc'} onClick={()=>setActiveSection('profile')}>Профиль</Button>
                <Link to='/bascket'>
                <Button id={'shop'}>Корзина</Button>
                </Link>
                
            </div>
            <button className="exit" onClick={logout}>Выход<IoExitOutline className="icon-exit"/></button>
            <div className="persacc">
                {RenderContent(activeSection)}
            </div>
        </div>
    )
}