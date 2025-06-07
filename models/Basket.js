import mongoose from "mongoose";


const BasketScheme= new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    items:[
        {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
      count: { type: Number, default: 1 }
    }
    ]
})

const Basket = mongoose.model("Basket",BasketScheme)
export default Basket