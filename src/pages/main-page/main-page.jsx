import { ImageMainPage } from "../../components/images/components/image-main"
import { Card } from "./components/card"
import { Header } from "../../components/header/header"
import './main-page.css'
import imgOne from '../../components/images/components/iphone_16.png'
import imgSecond from '../../components/images/tablet.png'
import imgThird from '../../components/images/laptop.png'
import { HeaderScroll } from "../../components/header/header-scroll/header-scroll"
import imgFourth from '../../components/images/headphones.png'
import { useState,useEffect,useRef } from "react"
import { Footer } from "../../components/footer/footer"


export const MainPage=()=>{

  const [showFixedHeader, setShowFixedHeader] = useState(false);
  const headerRef = useRef(null);
  const sentinelRef = useRef(null);

  

   useEffect(() => {
        const sentinelNode = sentinelRef.current;
        
        if (!sentinelNode) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowFixedHeader(!entry.isIntersecting);
            },
           
            { threshold: 0.9}
        );
        observer.observe(sentinelNode);
        return () => {
            if (sentinelNode) {
                observer.unobserve(sentinelNode);
            }
        };
    }, []); 

    return(
      <div className="main-page">
         <header 
        ref={headerRef}
        style={{
          position: 'sticky',
          transform: showFixedHeader ? 'translateY(-100%)' : 'translateY(0)',
                    transition: 'transform 0.3s ease-out'
        }}
      >
       <Header/>
      </header>
      <div 
        ref={sentinelRef} 
        style={{
          height: '30px',
          position: 'absolute',
        }} 
      />
      {showFixedHeader && (
        <header style={{
          position: 'fixed',
          zIndex:20,
        }}>
          <HeaderScroll/>
        </header>
      )}

      <div className="main-img">
        <ImageMainPage />
      </div>
      <div className="main-card-img">
     <Card to='/posts/smartphone'id={"card-left"} imageSrc={imgOne} name='Смартфоны' className='card-img'/>
      <Card to='/posts/tablet'id={"card-centerOne"}imageSrc={imgSecond} name='Планшеты' className='card-img'/>
      <Card to='/posts/laptop'id={"card-centerSecond"} imageSrc={imgThird} name='Ноутбуки' className='card-img'/>
      <Card id={"card-right"} imageSrc={imgFourth} name='Наушники' className='card-img'/>
      </div>
      <Footer/>
    </div>
    )
}