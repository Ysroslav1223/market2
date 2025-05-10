import mongoose from "mongoose";
import  ROLE  from "../constatns/ROLE.js";


const UserSchema = mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique:true
  },
  password:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  role:{
    type:Number,
    default:ROLE.USER

  }
})

const User = mongoose.model("User",UserSchema)
export default User

