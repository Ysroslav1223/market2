import './headers.css'
import { Input } from './components/input';
import { Button } from './components/buttons';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../selectors/select-user-role';
import { selectUserName } from '../../../selectors/select-user-name';
import { ROLE } from '../ROLE';

export const Header = () => {

  const roleId= useSelector(selectUserRole)
  const nameUser=useSelector(selectUserName)

 const formatUserName=(name)=>{

  if(name!==null){
    const splitName=name.split(' ')
     const lastName=splitName[0]
      const middleName=`${splitName[2][0]}.`
       const firstName=`${splitName[1][0]}.`
  
     return `${lastName} ${firstName}${middleName}`
  }
  }

   const formattedName=formatUserName(nameUser)


  return (
    <div>
      <div className="control-panel">
        <Input  />
        <AiOutlineShoppingCart className='bascket-shop'/>
        <Link className='link-trash'to='/bascket'><Button id={"trash"}>Корзина</Button></Link>
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

