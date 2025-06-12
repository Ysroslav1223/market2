import mapBasket from '../helper/mapBasket.js';
import Basket from '../models/Basket.js'

export async function getAllBasket(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authorized' });
        }
        const userId = req.user._id;
        let basket = await Basket.findOne({ userId }).populate("items.productId");
        if (!basket) {
            return res.json({ items: [] }); 
        }
        res.json({  basket:mapBasket(basket) }); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export async function deleteBasket(req, res){
   try {
    const userId = req.user.id;
    const productId = req.body.productId; 

    const basket = await Basket.findOne({ userId });
    if (!basket)
      return res.status(404).json({ message: 'Корзина не найдена' });

   const index = basket.items.findIndex(item => String(item.productId) === String(productId));
if (index === -1) {
    return res.status(404).json({ message: "Товар не найден в корзине" });
}
    basket.items.splice(index, 1);

    const updatedBasket = await basket.save();

    res.json({ message: 'Товар удалён', basket: updatedBasket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}
export async function deleteAllBasket(req,res){
    try{
        const userId = req.user.id

        const basket = await Basket.findOne({userId})
        if (!basket)
      return res.status(404).json({ message: 'Корзина не найдена' });

        await Basket.deleteOne({ userId });
        
        return res.status(200).json({ message: 'Корзина успешно удалена' });
    }catch (error) {
        return res.status(500).json({ message: 'Ошибка сервера', error: error.message });
}
}