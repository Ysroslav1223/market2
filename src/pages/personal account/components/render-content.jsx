import { useSelector } from "react-redux"
import { selectUserName } from "../../../../selectors/select-user-name"
import "./render-content.css"
import { TextForUs } from "./text-for-us"

import { CardOfBasket } from "./card-of-basket"
import { getBasket } from "./get-basket"
import { useEffect } from "react"
import { setBasket } from "../../../../action/set-basket"
import { setUpdateBasket } from "../../../../action/set-update-basket"
import { useDispatch } from "react-redux"
import { setDeleteCardBasket } from "../../../../action/set-delete-card-basket"




export const RenderContent=(activeSection)=>{

       console.log('RenderContent RENDER');

       const dispatch = useDispatch()
       const basket = useSelector(state=>state.basket)

       console.log(basket);
       
       
           useEffect(() => {
    const fetchBasket = async () => {
      try {
        const basketData = await getBasket(); 
        dispatch(setBasket(basketData));
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error);
      }
    };

    fetchBasket();
  }, [dispatch]); 

   
    const nameUser=useSelector(selectUserName)
   


    const formatName=(name)=>{
        if(name!==null){
            const splitName=name.split(' ')
            const firstName=splitName[1]
            return firstName
        }else return
    }
    const firstName=formatName(nameUser)

   const handleCountChange = async(id,change) => {
     try {
    const currentItem = basket.find(item => item._id.toString() === id.toString());
    if (!currentItem) return;

    const newCount = currentItem.count + change;
    if (newCount < 1) return;

    dispatch(setUpdateBasket(id,newCount));


    await fetch("http://localhost:3000/update", {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: id,
        count: newCount
      }),
      credentials: 'include'
    });

    const updateData = await getBasket()

    dispatch(setBasket(updateData))

  } catch (error) {
    console.error("Update error:", error);
    const basketData = await getBasket();
    dispatch(setBasket(basketData));
  }
};
   const handleClickDelete = async (id) => {
  try {
    console.log(id);
    dispatch(setDeleteCardBasket(id));

    const response = await fetch('http://localhost:3000/delete', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: id }), 
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }
    const updatedBasket = await getBasket();
    dispatch(setBasket(updatedBasket));

  } catch (error) {
    console.error("Delete error:", error);

    const basketData = await getBasket();
    dispatch(setBasket(basketData));
  }
};



     const renderContent=()=>{
        switch(activeSection){
            case 'about': return <div className="content-section text">
                <TextForUs/>
                </div>
            case 'personal': return(<div className="content-section welcome">
                <h2>{`${firstName!==undefined?firstName:''} ${firstName===undefined?'Zstore, Привествует вас':', Приветсвуем'}`}</h2>
                <h3 className="ourbuy"> Ваши покупки:</h3>
            </div>
            )
            case 'profile':
                return(
                    <div className="content-section profile">
                        <h2>Профиль</h2>
                    </div>
                )
            case 'bascket':
                return(
                    <div  className="content-section">
                        <div >{basket.map((item,idx)=>(
                            <CardOfBasket   key={`${item.productId}_${idx}`} imgSrc={item.image} name={item.name} price={item.price} onDelete={()=>handleClickDelete(item._id)}
                            onCountChange={(change)=>handleCountChange(item._id,change)} count={item.count}/>
                        ))}</div>
                    </div>
                )
            default:
                return <div>Выберите раздел</div>
        }
    }
    return renderContent(activeSection)
}