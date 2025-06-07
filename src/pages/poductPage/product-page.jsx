import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { ProductCard } from "./components/product-card"
import { HeaderScroll } from "../../components/header/header-scroll/header-scroll"


export const ProductPage=()=>{

    const {id}=useParams()
    const[product,setProduct]=useState([])

    useEffect(()=>{
        try{
            fetch(`http://localhost:3000/posts/${id}`,{
                method:"GET",
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then((res)=>res.json())
            .then((res)=>setProduct(res.data))
        }catch(e){
            console.log(e.message);
        }
    },[id])
    return(
        <div>
            <div>
                <HeaderScroll/>
            </div>
            <div>
                {product && <ProductCard imgSrc={product.image} name={product.name} price={product.price}/>}
            </div>
        </div>
    )
}