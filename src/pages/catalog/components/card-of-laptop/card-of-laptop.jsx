import { Link } from "react-router-dom"
import './card-of-laptop.css'


export const CardOfLaptop=({id,to,imageSrc,price,name})=>{
    return(
        <div className={`card-catalog ${id}`}>
        <div className="card-catalog-top">
          <Link to={to} >
            <img src={imageSrc} alt="card-image" className="card-laptop-img"/>
          </Link>
        </div>
        <div className="card-catalog-bottom">
            <div className="card-laptop-name">{name}</div>
            <div className="card-laptop-price">{`от ${price}₽`}</div>
        </div>
      </div>
    )
}