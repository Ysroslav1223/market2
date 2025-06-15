import { Link } from "react-router-dom"
import './card-of-smartphone.css'
import { FaRegTrashAlt } from "react-icons/fa";


export const CardOfSmartphone=({id,to,imageSrc,price,name,onDelete,onEdit})=>{

    const currentUrl = window.location.pathname

    const isEditCard = currentUrl==="/posts/allProducts"
    return(
        <div className={`card-catalog ${id}`}>
        <div className="card-catalog-top">
          <Link to={to} >
            <img src={imageSrc} alt="card-image" className="card-smartphone-img"/>
          </Link>
        </div>
        <div className="card-catalog-bottom">
            <div className="card-smartphone-name">{name}</div>
            {!isEditCard? <div className="card-smartphone-price">{`от ${price}₽`}</div>:
            <div className="btn-edit">
              <button className="edit" onClick={onEdit}>Редактировать</button>
               <button className="delete-btn" onClick={onDelete}><FaRegTrashAlt /></button>
              </div>}
        </div>
      </div>
    )
}