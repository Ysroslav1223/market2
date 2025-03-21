import { ImageMainPage } from "../../components/images/components/image-main"
import { Card } from "./components/card"
import { Header } from "../../components/header/header"
import './main-page.css'
import imgOne from '../../components/images/components/iphone_16.png'
import imgSecond from '../../components/images/tablet.png'
import imgThird from '../../components/images/laptop.png'
import imgFourth from '../../components/images/headphones.png'

export const MainPage=()=>{
    return(
      <div className="main-page">
        <Header/>
      <div className="main-img">
        <ImageMainPage />
      </div>
      <Card id={"card-left"} imageSrc={imgOne} name='Смартфоны' className='card-img'/>
      <Card id={"card-centerOne"}imageSrc={imgSecond} name='Планшеты' className='card-img'/>
      <Card id={"card-centerSecond"} imageSrc={imgThird} name='Ноутбуки' className='card-img'/>
      <Card id={"card-right"} imageSrc={imgFourth} name='Наушники' className='card-img'/>
    </div>
    )
}