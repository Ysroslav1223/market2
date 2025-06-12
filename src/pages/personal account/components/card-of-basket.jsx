
import './card-of-basket.css'
import { RxCrossCircled } from "react-icons/rx";



export const CardOfBasket=({imgSrc,name,price,onDelete,onCountChange,count,isPersonalAccount = false,})=>{


    return(
        <div className="card-basket">
            {!isPersonalAccount&&(
                <button className='delete' onClick={onDelete}><RxCrossCircled /></button>
            )}
            <div>
                <img src={imgSrc} className="img-basket"/>
            </div>
            <div className='title-backet-product'>
                {name}
            </div>
            <h2 className='price-backet-product'>
                {`${price} ₽`}
            </h2>
            <div className='count-product-basket'>
                {!isPersonalAccount?(
                    <>
                    <button disabled={count===1} onClick={()=>onCountChange(-1)} className='minus-count'>-</button>
                    <span className='count-product'>{count}</span>
                <button onClick={()=>onCountChange(1)}className='plus-count'>+</button>
                </>
                ):(<div className='count-product-buy'>Количество: {count}</div>)}
            </div>
        </div>
    )
}