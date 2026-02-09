import { Link } from "react-router-dom"
import { FaRegTrashAlt } from "react-icons/fa";
import './card-of-all-products.css'


export const CardOfAllProducts=({id,to,imageSrc,price,name,onDelete})=>{
  const currentUrl = window.location.pathname

    const isEditCard = currentUrl==="/posts/allProducts"
    return(
        <div className={`card-catalog ${id}`}>
        <div className="card-catalog-top">
          <Link to={to} >
            <img src={imageSrc} alt="card-image" className="card-all-img"/>
          </Link>
        </div>
        <div className="card-catalog-bottom">
            <div className="card-all-name">{name}</div>
            {!isEditCard?<div className="card-all-price">{`от ${price}₽`}</div>:
            <div className="btn-edit">
                 <button className="edit">Редактировать</button>
                 <button className="delete-btn" onClick={onDelete}><FaRegTrashAlt /></button>
              </div>}
        </div>
      </div>
    )
}