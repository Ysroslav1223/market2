import './footr.css'
import { Link } from 'react-router-dom'

export const Footer=()=>{
    return(
    <div className="footer" style={{marginTop:"60vh"}}>
        <div className='footer-content'>
            <div>
                <h2 className='title-footer'>Компания</h2>
                <Link>О нас</Link>
            </div>
            <div className='catalog-content'>
                <h2>Каталог</h2>
                <Link>Техника Apple</Link>
            </div>
            <div>
                <h2 className='title-footer'>Контакты</h2>
                <p>+7 (999) 999 99 99</p>
            </div>
            <div className='catalog-content'>
                <h2 className='title-footer'>Информация</h2>
                <Link>Оплаата и доставка</Link>
                <Link>Возврат</Link>
                <Link>Гарантия</Link>
            </div>
        </div>
    </div>
    )
}