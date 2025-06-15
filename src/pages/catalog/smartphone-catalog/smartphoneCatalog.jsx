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
import { CardOfAllProducts } from '../card-of-all-products/card-of-all-products'
import { selectUserRole } from '../../../../selectors/select-user-role'
import { useNavigate } from 'react-router-dom'
import ROLE from '../../../../constatns/ROLE'




export const SmartphoneCatalog=()=>{

    const {type}=useParams()

    const roleId = useSelector(selectUserRole)
    const navigate= useNavigate()


    const[smartphone,setSmartphone]=useState([])
    const [groupedProducts, setGroupedProducts] = useState({});
    const[allProducts,setAllProducts]=useState({})
    const[sortType,setSortType]=useState('all')

    console.log(smartphone);
   
    const searchProduct=useSelector(state=>state.research.data)
  
   
    const groupByGeneration = (products) => {
    return products.reduce((acc, product) => {
        const generation = product.generation; 
        if (!acc[generation]) {
            acc[generation] = []; 
        }
        acc[generation].push(product); 
        return acc;
    }, {}); 
}

const categoryAndGenerationAllProducts=(products)=>{
    const result={}

    products.forEach((product)=>{
        const {category,generation}=product

        if(!result[category]){
            result[category]={}
        }

        if(!result[category][generation]){
            result[category][generation]=[]
        }

        result[category][generation].push(product)
    })
    return result
}


useEffect(()=>{
    const generateCatalog = categoryAndGenerationAllProducts(smartphone)
    setAllProducts(generateCatalog)
    console.log(generateCatalog);
},[smartphone])

console.log(allProducts);


 useEffect(() => {
     const filteredProducts = smartphone.filter(
        (product) => product.category === type 
    );
        const productsByGeneration = groupByGeneration(filteredProducts);
        setGroupedProducts(productsByGeneration);
    }, [smartphone,type]);

        
   const handleDelete = async (id) => {
    try {
        const response = await fetch("http://localhost:3000/deleteCard", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ id:id }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Ошибка при удалении:", errorData.message);
            return;
        }
setSmartphone((prevSmartphones) => {
    const updatedSmartphones = prevSmartphones.filter((item) => {
         return item.id !== String(id)
    });
    return updatedSmartphones;
});
    } catch (error) {
        console.error( error);
    }
};

    const handleEdit=(id)=>{
        if(roleId===ROLE.ADMIN){
            navigate(`/posts/update/${id}`)
        }else navigate('/')
    }
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

    const handleSortAllProducts=(products)=>{
        if(type==="allProducts"&&'search'){
            return[...products].sort((a,b)=>{
              const priceA = parseInt(a.price.replace(/\D/g,''),10)
              const priceB = parseInt(b.price.replace(/\D/g,''),10)
  
              if(sortType==='cheap'){
                  return priceA-priceB
              }else {
                  return priceB-priceA
              }
            })
        }
    }
   
    
    const renderCatalog = ()=>{

        if(sortType==="cheap"){
            const cheapProducts = handleSortProducts(smartphone)
            const cheapAllProducts = handleSortAllProducts(smartphone)
            
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
                     {type==='smartphone'?<div className='catalog-filter'>
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
                            </div>:""}
                     {type==='tablet'?<div className='catalog-filter'>
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
                            </div>:""}
                
                            {type==='allProducts'?<div className='catalog-filter'>
                                {cheapAllProducts.map((data)=>(
                                    <CardOfAllProducts  
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                     to={`/posts/tablet/${data.id}`}
                                    />
                                ))}
                            </div>:''}
                            </div>
            )
        }else if(sortType==='expensive'){
            const expensiveProducts = handleSortProducts(smartphone)
            const expensiveAllProducts = handleSortAllProducts(smartphone);
            return (
                <div>
                     {type==='smartphone'?<h2 className='title-catalog'>Iphone</h2>:''}
                     {type==='tablet'?<h2 className='title-catalog'>iPad</h2>:''}
                     {type==='laptop'?<div>
                        <h2 className='title-catalog'>MacBook</h2>
                        <div className='catalog-filter'>
                                {expensiveProducts.map((data)=>(
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
                                {expensiveProducts.map((data)=>(
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
                {type==='smartphone'?<div className='catalog-filter'>
                                {expensiveProducts.map((data)=>(
                                    <CardOfSmartphone  
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/smartphone/${data.id}`}
                                    />
                                ))}
                            </div>:""}
                {type==='tablet'?<div className='catalog-filter'>
                                {expensiveProducts.map((data)=>(
                                    <CardOfSmartphone  
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                    to={`/posts/smartphone/${data.id}`}
                                    />
                                ))}
                            </div>:""}
                            {type==='allProducts'?<div className='catalog-filter'>
                                {expensiveAllProducts.map((data)=>(
                                    <CardOfLaptop  
                                    key={data.id}
                                    id={data.id}
                                    name={data.name}
                                    imageSrc={data.image}
                                    price={data.price}
                                     to={`/posts/tablet/${data.id}`}
                                    />
                                ))}
                            </div>:''}
                            </div>
            )
        }else{
            switch (type){
                case "smartphone":{
                    return(
                        <div>
                        {Object.keys(groupedProducts)
                .sort((a, b) => b - a) 
                .map((generation) => (
                    <div key={generation}>
                        <h2 className="title-catalog">iPhone {generation}</h2>
                        <div className="card-catalog-phone">
                            {groupedProducts[generation].map((data) => (
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
                ))}  
                        </div>
                    ) 
                     }
                     case "tablet":{
                        return(
                            <div>
                        {Object.keys(groupedProducts)
                .sort((a, b) => b - a) 
                .map((generation) => (
                    <div key={generation}>
                        <h2 className="title-catalog">iPad {generation}</h2>
                        <div className="card-catalog-phone">
                            {groupedProducts[generation].map((data) => (
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
                ))}  
                        </div>
                    ) 
                     } 
                     case "headphones":{
                        return(
                              <div>
                        {Object.keys(groupedProducts)
                .sort((a, b) => b - a) 
                .map((generation) => (
                    <div key={generation}>
                        <h2 className="title-catalog">iPad {generation}</h2>
                        <div className="card-catalog-phone">
                            {groupedProducts[generation].map((data) => (
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
                    </div>
                ))}  
                        </div>
                        )
                     } 
                     case "laptop":{
                        return(
                              <div>
                        {Object.keys(groupedProducts)
                .sort((a, b) => b - a) 
                .map((generation) => (
                    <div key={generation}>
                        <h2 className="title-catalog">iPad {generation}</h2>
                        <div className="card-catalog-phone">
                            {groupedProducts[generation].map((data) => (
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
                    </div>
                ))}  
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
                     case "allProducts":{
                        if (roleId !== ROLE.ADMIN) {
                             return navigate("/");
                                 }
                        return(
                        <div>
                           {Object.entries(allProducts).map(([category,generations])=>(
                            <div key={category}>
                                 <h2 className='title-category'>{{
                                        smartphone: "Смартфоны",
                                        tablet: "Планшеты",
                                        laptop: "Ноутбуки",
                                        headphones: "Наушники"
                                    }[category] || "Неизвестная категория"}</h2>
                                {Object.entries(generations).sort(([a],[b])=>b-a).map(([generation,items])=>(
                                    <div key={generation}>
                                        <h2 className='title-generation'>{{
                                            smartphone:"Iphone",
                                            tablet: "iPad",
                                            laptop: "MacBook",
                                            headphones: "AirPods"
                                        }[category]}{generation}</h2>
                                            {category==='smartphone'?<div className='catalog-filter'>
                                                {items.map((data)=>(
                                                    <CardOfSmartphone  key={data._id}
                                                        id={data.id}
                                                        name={data.name}
                                                        imageSrc={data.image}
                                                        price={data.price}
                                                        to={`/posts/search/${data.id}`}
                                                        onDelete={()=>handleDelete(data.id)}
                                                        onEdit={()=>handleEdit(data.id)}/>
                                                ))}
                                            </div>:''}
                                            {category==='tablet'?<div className='catalog-filter'>
                                                {items.map((data)=>(
                                                    <CardOfSmartphone key={data._id}
                                                        id={data.id}
                                                        name={data.name}
                                                        imageSrc={data.image}
                                                        price={data.price}
                                                        to={`/posts/search/${data.id}`}
                                                        onDelete={()=>handleDelete(data.id)}  />
                                                ))}
                                            </div>:''}
                                            {category==='headphones'?<div className='catalog-filter'>
                                                {items.map((data)=>(
                                                    <CardOfHeadphones key={data._id}
                                                        id={data.id}
                                                        name={data.name}
                                                        imageSrc={data.image}
                                                        price={data.price}
                                                        to={`/posts/search/${data.id}`}
                                                        onDelete={()=>handleDelete(data.id)}/>
                                                ))}
                                            </div>:""}
                                            {category==='laptop'?<div className='catalog-filter'>
                                                {items.map((data)=>(
                                                    <CardOfLaptop key={data._id}
                                                        id={data.id}
                                                        name={data.name}
                                                        imageSrc={data.image}
                                                        price={data.price}
                                                        to={`/posts/search/${data.id}`}
                                                        onDelete={()=>handleDelete(data.id)}/>
                                                ))}
                                            </div>:''}
                                        </div>
                                ))}
                            </div>
                           ))}
                        </div>
                        )
                     }    
                     case 'update':{
                        return(
                            <div>
                                <input/>
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
           <Link className='main-routing' to='/'>Главная страница</Link>
           {roleId===ROLE.ADMIN?<Link className='main-routing' to='/admin'>/Добавление товара </Link>:''}
           </div>
            {type==="serach"?<div className='btn-container'>
            <button className='btn-poor' onClick={()=>setSortType("cheap")}>Сначала дешевле</button>
            <button className='btn-exp'  onClick={()=>setSortType("expensive")}>Сначала дороже</button>
            <button className='btn-all'  onClick={()=>setSortType("all")}>Все</button>
           </div>:''}
           
           {renderCatalog()}
           <Footer/>
        </div>
    )
}