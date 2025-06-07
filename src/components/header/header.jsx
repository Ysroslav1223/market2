import './headers.css'
import { Input } from './components/input';
import { Button } from './components/buttons';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../selectors/select-user-role';
import { useFormatUserName } from '../../../hooks/use-format-user-name';
import { RiBellLine } from "react-icons/ri";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchProducts } from '../../../action/set-search-products.jsx';
import { useNavigate } from 'react-router-dom';



import  ROLE  from '../../../constatns/ROLE.js';

export const Header = () => {

  const roleId= useSelector(selectUserRole)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const[searchQuery,setSearchQuary]=useState('')
   
  

 const handleSearch=async()=>{
  const res= await fetch(`http://localhost:3000/search?q=${searchQuery}`,{
    method:'GET',
    headers:{
      'Content-Type': 'application/json'
    },
     credentials: 'include',
  })
  if(res){
    const productData = await res.json()
    dispatch(setSearchProducts(productData))
    navigate('/posts/search')

  }else{
   return(
    <div>
      Загрузка...
    </div>
   )
  }
 }
 

  console.log(roleId);
  

   const formattedName=useFormatUserName()
  console.log(formattedName)


  return (
    <header className={`header`}>
      <div className="control-panel">
        <Link className='link-icon'to='/'><span className='title'><RiBellLine className='icon-title'/>Zstore</span></Link>
        <Input value={searchQuery}
        type="text" onChange={(e)=>{setSearchQuary(e.target.value)
           console.log(e.target.value)
        }}
        
       />
       <button className="btn-search" onClick={handleSearch}>найти</button>
        <AiOutlineShoppingCart className='bascket-shop'/>
        <Link className='link-trash' to="/personAcc?tab=bascket"><Button id={"trash"} >Корзина</Button></Link>
        {roleId===ROLE.GUEST? (
        <Link  className='link-entry' to='/auth'><Button id={"entry"}>Вход</Button>
          </Link>
        ):(
          <>
          <Link className='link-entry' to='/personAcc'><Button id={"entry"}>{formattedName}</Button></Link>
          </>
        )
        }
      </div>
    </header>
  );
};

