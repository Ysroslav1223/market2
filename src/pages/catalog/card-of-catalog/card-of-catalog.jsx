import { Link } from "react-router-dom"
import './card-of-catalog.css'

export const CardOfCatalog=({id,to,imageSrc,price,name})=>{
    return(
        <div className={`card-catalog ${id}`}>
        <div className="card-catalog-top">
          <Link to={to} >
            <img src={imageSrc} alt="card-image" className="card-catalog-img"/>
          </Link>
        </div>
        <div className="card-catalog-bottom">
            <div className="card-catalog-name">{name}</div>
            <div className="card-catalog-price">{`от ${price}₽`}</div>
        </div>
      </div>
    )
}