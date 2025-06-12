import './smartphoneCatalog.css'
import { HeaderScroll } from '../../../components/header/header-scroll/header-scroll'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Footer } from '../../../components/footer/footer'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CardOfLaptop } from '../components/card-of-laptop/card-of-laptop'
import { CardOfSmartphone } from '../components/card-of-smartphone/card-of-smartphone'
import { CardOfHeadphones } from '../components/card-of-headphopnes/card-of-headphones'



export const SmartphoneCatalog=()=>{

    const {type}=useParams()


    const[smartphone,setSmartphone]=useState([])
    const[sortType,setSortType]=useState('all')
   
    const searchProduct=useSelector(state=>state.research.data)
        console.log(searchProduct);
  
   
   

    useEffect(()=>{
        
        fetch(`http://localhost:3000/posts?.category=${type}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json())
        .then((res)=>{
            const products = res?.data.posts||[]
            setSmartphone(products)
            console.log(products);
        })
    },[type])

    const handleSortProducts=(products)=>{
          return[...products].sort((a,b)=>{
            const priceA = parseInt(a.price.replace(/\D/g,''),10)
            const priceB = parseInt(b.price.replace(/\D/g,''),10)

            if(sortType==='cheap'){
                return priceA-priceB
            }else {
                return priceB-priceA
            }
          }).filter((e)=>e.category===type)
    }
    
    const renderCatalog = ()=>{

        if(sortType==="cheap"){
            const cheapProducts = handleSortProducts(smartphone)
            console.log(cheapProducts);
            return (
                <div>
                     {type==='smartphone'?<h2 className='title-catalog'>Iphone</h2>:''}
                     {type==='tablet'?<h2 className='title-catalog'>iPad</h2>:''}
                     {type==='laptop'?<div>
                        <h2 className='title-catalog'>MacBook</h2>
                         <div className='catalog-filter'>
                                {cheapProducts.map((data)=>(
                                    <CardOfLaptop  
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/smartphone/${data.id}`}
                                    />
                                ))}
                            </div>
                     </div>:''}
                     {type==='headphones'?<div>
                          <h2 className='title-catalog'>AirPods</h2>
                        <div className='catalog-filter'>
                                {cheapProducts.map((data)=>(
                                    <CardOfHeadphones  
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/smartphone/${data.id}`}
                                    />
                                ))}
                            </div>
                     </div>:''}
                <div className='catalog-filter'>
                                {cheapProducts.map((data)=>(
                                    <CardOfSmartphone  
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/smartphone/${data.id}`}
                                    />
                                ))}
                            </div>
                            </div>
            )
        }else if(sortType==='expensive'){
            const cheapProducts = handleSortProducts(smartphone)
            console.log(cheapProducts);
            return (
                <div>
                     {type==='smartphone'?<h2 className='title-catalog'>Iphone</h2>:''}
                     {type==='tablet'?<h2 className='title-catalog'>iPad</h2>:''}
                     {type==='laptop'?<div>
                        <h2 className='title-catalog'>MacBook</h2>
                        <div className='catalog-filter'>
                                {cheapProducts.map((data)=>(
                                    <CardOfLaptop  
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                     to={`/posts/tablet/${data.id}`}
                                    />
                                ))}
                            </div>
                     </div>:""}
                     {type==='headphones'?<div>
                        <h2 className='title-catalog'>AirPods</h2>
                        <div className='catalog-filter'>
                                {cheapProducts.map((data)=>(
                                    <CardOfHeadphones  
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                     to={`/posts/tablet/${data.id}`}
                                    />
                                ))}
                            </div>
                     </div>:''}
                <div className='catalog-filter'>
                                {cheapProducts.map((data)=>(
                                    <CardOfSmartphone  
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                     to={`/posts/tablet/${data.id}`}
                                    />
                                ))}
                            </div>
                            </div>
            )
        }else{
            switch (type){
                case "smartphone":{
                    const iphone15 = smartphone.filter((e)=>e.generation===15)
                    const iphone16 = smartphone.filter((e)=>e.generation===16)
                    const iphone14 =smartphone.filter((e)=>e.generation===14)
                    const iphone13 = smartphone.filter((e)=>e.generation===13)
                    return(
                        <div>
                            <h2 className='title-catalog'>Iphone 16</h2>
                                <div className='card-catalog-phone'>
                                    {iphone16.map((data)=>(
                                        <CardOfSmartphone  
                                        key={data.id}
                                        id={data.id}
                                        name={data.name}
                                        imageSrc={data.image}
                                        price={data.price}
                                        to={`/posts/smartphone/${data.id}`}
                                        />
                                    ))}
                                </div>
                            <h2 className='title-catalog'>Iphone 15</h2>
                                <div className='card-catalog-phone'>
                                    {iphone15.map((data)=>(
                                    <CardOfSmartphone 
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/smartphone/${data.id}`}/>
                                ))}
                                </div>
                            <h2 className='title-catalog'>Iphone 14</h2>
                                <div className='card-catalog-phone'>
                                    {iphone14.map((data)=>(
                                    <CardOfSmartphone 
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/smartphone/${data.id}`}/>
                                ))}
                                </div>
                                <h2 className='title-catalog'>Iphone 13</h2>
                                <div className='card-catalog-phone'>
                                    {iphone13.map((data)=>(
                                    <CardOfSmartphone 
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/smartphone/${data.id}`}/>
                                ))}
                                </div>
                        </div>
                    ) 
                     }
                     case "tablet":{
                        const tablet25 = smartphone.filter((e)=>e.generation===25)
                        const tablet24 = smartphone.filter((e)=>e.generation===24)
                        const tablet22 = smartphone.filter((e)=>e.generation===23)
                        return(
                            <div>
                                <h2 className='title-catalog'>iPad 2025</h2>
                                <div className='card-catalog-phone'>
                                     {tablet25.map((data)=>(
                                    <CardOfSmartphone 
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/tablet/${data.id}`}/>
                                ))}
                                </div>
                                <div>
                                    <h2 className='title-catalog'>iPad 2024</h2>
                                    <div className='card-catalog-phone'>
                                        {tablet24.map((data)=>(
                                    <CardOfSmartphone 
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/tablet/${data.id}`}/>
                                ))}
                                    </div>
                                    <div>
                                        <h2 className='title-catalog'>iPad 2024</h2>
                                    <div className='card-catalog-phone'>
                                        {tablet22.map((data)=>(
                                    <CardOfSmartphone 
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/tablet/${data.id}`}/>
                                ))}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        )
                     } 
                     case "headphones":{

                        const headphonesMax = smartphone.filter((e)=>e.generation===30)
                        const headphones4 = smartphone.filter((e)=>e.generation===31)
                        const headphones3 = smartphone.filter((e)=>e.generation===32)
                        const headphones2 = smartphone.filter((e)=>e.generation===33)
                        return(
                            <div>
                                
                                 <h2 className='title-catalog'>Apple AirPods Max</h2>
                                <div className='card-catalog-phone'>
                                     {headphonesMax.map((data)=>(
                                    <CardOfHeadphones 
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/tablet/${data.id}`}/>
                                ))}
                                </div>
                                  <h2 className='title-catalog'>Apple AirPods 4</h2>
                                 <div className='card-catalog-phone'>
                                     {headphones4.map((data)=>(
                                    <CardOfHeadphones 
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/tablet/${data.id}`}/>
                                ))}
                                </div>
                                  <h2 className='title-catalog'>Apple AirPods 3</h2>
                                 <div className='card-catalog-phone'>
                                     {headphones3.map((data)=>(
                                    <CardOfHeadphones 
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/tablet/${data.id}`}/>
                                ))}
                                </div>
                                  <h2 className='title-catalog'>Apple AirPods 2</h2>
                                 <div className='card-catalog-phone'>
                                     {headphones2.map((data)=>(
                                    <CardOfHeadphones 
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/tablet/${data.id}`}/>
                                ))}
                                </div>
                            </div>
                        )
                     } 
                     case "laptop":{
                        const laptop14 = smartphone.filter((e)=>e.generation===40)
                        const laptop13 = smartphone.filter((e)=>e.generation===41)
                        const laptop12 = smartphone.filter((e)=>e.generation===42)
                        return(
                            <div>
                                 <h2 className='title-catalog'>MacBook Pro 2024</h2>
                                <div className='catalog-filter'>
                                     {laptop14.map((data)=>(
                                    <CardOfLaptop 
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/laptop/${data.id}`}/>
                                ))}
                                </div>
                                  <h2 className='title-catalog'>MacBook Air</h2>
                                <div className='catalog-filter'>
                                     {laptop13.map((data)=>(
                                    <CardOfLaptop 
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/laptop/${data.id}`}/>
                                ))}
                                </div>
                                  <h2 className='title-catalog'>MacBook Pro 14</h2>
                                <div className='catalog-filter'>
                                     {laptop12.map((data)=>(
                                    <CardOfLaptop 
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/laptop/${data.id}`}/>
                                ))}
                                </div>
                            </div>
                        )
                     }
                     case "search":{
                        return(
                            <div>
                                 <h2 className='title-catalog'>Найденый товар</h2>
                                <div className='catalog-filter'>
                                     {searchProduct.map((data)=>(
                                    <CardOfSmartphone 
                                    key={data._id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/search/${data._id}`}/>
                                ))}
                                </div>
                            </div>
                        )
                     }              
            }
        }
    }
    return (
        <div>
           <HeaderScroll/>
           <div className='routing'>    
           <Link className='main-routing' to='/'>Главная страница </Link>
           </div>
           <div className='btn-container'>
            <button className='btn-poor' onClick={()=>setSortType("cheap")}>Сначала дешевле</button>
            <button className='btn-exp'  onClick={()=>setSortType("expensive")}>Сначала дороже</button>
            <button className='btn-all'  onClick={()=>setSortType("all")}>Все</button>
           </div>
           {renderCatalog()}
           <Footer/>
        </div>
    )
}