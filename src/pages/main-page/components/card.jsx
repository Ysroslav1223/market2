
export const Card=({ id, imageSrc,name })=>{
    return(
        <div className={`card ${id}`}>
        <div className="card-top">
        <div className="card-name">{name}</div>
          <a href="#" className="card-img">
            <img src={imageSrc} alt="card-image"/>
          </a>
        </div>
        <div className="card-bottom">
        </div>
      </div>
    )
}