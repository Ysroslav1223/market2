import { Link } from "react-router-dom"

export const Card=({ id, imageSrc,name,to,onClick })=>{
    return(
        <div className={`card ${id}`} onClick={onClick}>
        <div className="card-top">
        <div className="card-name">{name}</div>
          <Link to={to} className="card-img">
            <img src={imageSrc} alt="card-image"/>
          </Link>
        </div>
        <div className="card-bottom">
        </div>
      </div>
    )
}