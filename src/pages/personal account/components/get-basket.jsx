


export const getBasket= ()=>{
   return fetch(`http://localhost:3000/add/my`,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json'
        },
          credentials: 'include',
    }).then((res)=>res.json())
    .then(res=>{
        const basketItems = res.basket.items.map((item)=>({...item.productId,count:item.count}))
        return basketItems
    })
}