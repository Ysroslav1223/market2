import './headers.css'
import { Input } from './components/input';
import { Button } from './components/buttons';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../selectors/select-user-role';
import { useFormatUserName } from '../../../hooks/use-format-user-name';

import  ROLE  from '../../../constatns/ROLE.js';

export const Header = () => {

  const roleId= useSelector(selectUserRole)
  console.log(roleId);
  

   const formattedName=useFormatUserName()
  console.log(formattedName)


  return (
    <div>
      <div className="control-panel">
        <Input  />
        <AiOutlineShoppingCart className='bascket-shop'/>
        <Link className='link-trash'to='/bascket'><Button id={"trash"} >Корзина</Button></Link>
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
    </div>
  );
};

