import mongoose from "mongoose";



const PostSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
category:{
        type:String,
        required:true
    },
    image: {
        type: String 
    },
    generation:{
        type:Number,
        required:true
    }
})

const Posts = mongoose.model("Posts",PostSchema)
export default Posts