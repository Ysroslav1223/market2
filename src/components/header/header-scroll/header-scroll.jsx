import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RiBellLine } from "react-icons/ri";
import './header-scroll.css'

export const HeaderScroll=()=>{
    return(
         <header className={`header-scroll`}>
                <div className='content-header'><Link className="icon-menu" to='/personAcc?tab=bascket'><AiOutlineShoppingCart/></Link>
                <Link className="icon-own" to='/personAcc'><IoPersonOutline/></Link><Link className='link-icon' to='/'><span className='title-scroll'><RiBellLine />Zstore</span></Link></div>
            </header>
    )
}