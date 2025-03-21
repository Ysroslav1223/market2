import './headers.css'
import { Input } from './components/input';
import { Button } from './components/buttons';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div>
      <div className="control-panel">
        <Input  />
        <AiOutlineShoppingCart className='bascket-shop'/>
        <Link className='link-trash'to='/bascket'><Button id={"trash"}>Корзина</Button></Link>
        <Link  className='link-entry' to='/auth'><Button id={"entry"}>Вход</Button>
          </Link>
      </div>
    </div>
  );
};

