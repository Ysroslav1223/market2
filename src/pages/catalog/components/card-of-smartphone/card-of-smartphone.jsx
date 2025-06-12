import { Link } from "react-router-dom"
import './card-of-smartphone.css'


export const CardOfSmartphone=({id,to,imageSrc,price,name})=>{
    return(
        <div className={`card-catalog ${id}`}>
        <div className="card-catalog-top">
          <Link to={to} >
            <img src={imageSrc} alt="card-image" className="card-smartphone-img"/>
          </Link>
        </div>
        <div className="card-catalog-bottom">
            <div className="card-smartphone-name">{name}</div>
            <div className="card-smartphone-price">{`от ${price}₽`}</div>
        </div>
      </div>
    )
}