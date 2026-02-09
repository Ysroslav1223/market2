import { Link } from "react-router-dom"
import { FaRegTrashAlt } from "react-icons/fa";
import './card-of-laptop.css'


export const CardOfLaptop=({id,to,imageSrc,price,name,onDelete})=>{
  const currentUrl = window.location.pathname

    const isEditCard = currentUrl==="/posts/allProducts"
    return(
        <div className={`card-catalog ${id}`}>
        <div className="card-catalog-top">
          <Link to={to} >
            <img src={imageSrc} alt="card-image" className="card-laptop-img"/>
          </Link>
        </div>
        <div className="card-catalog-bottom">
            <div className="card-laptop-name">{name}</div>
            {!isEditCard?<div className="card-headphones-price">{`от ${price}₽`}</div>:
            <div className="btn-edit">
                 <button className="edit">Редактировать</button>
                 <button className="delete-btn" onClick={onDelete}><FaRegTrashAlt /></button>
              </div>}
        </div>
      </div>
    )
}