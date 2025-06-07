import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { deleteUser, getRoles, getUser, register } from "./controller/user.js";
import {getAllPosts,getPost} from "./controller/posts.js";
import { getAllBasket } from "./controller/baskets.js";
import { auth } from "./controller/user.js";
import mapUser from "./helper/mapUser.js";
import authenticated from "./middleware/authenticated.js";
import hasrole from "./middleware/hasrole.js";
import ROLE from "./constatns/ROLE.js";
import { updateUser } from "./controller/user.js";
import cors from "cors";
import mapPosts from "./helper/mapPosts.js";
import Basket from './models/Basket.js'
import mapBasket from "./helper/mapBasket.js";
import { deleteBasket } from "./controller/baskets.js";


const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
  try {
    const {user,token} = await register(req.body.email, req.body.name, req.body.password);
    res.cookie('token',token,{httpOnly:true})
    .send({ error: null, user:mapUser(user)});
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.post("/auth", async (req, res) => {
  try {
    const {user, token} = await auth(req.body.email, req.body.password)
    res.cookie('token',token,{httpOnly:true}).send({ error: null, user:mapUser(user)},token)
  } catch (e) {
    res.status(500).json({ succsess: false, error: e.message });
  }
});

app.post('/logout',(req,res)=>{
  res.cookie('token','',{httpOnly:true}).send({})
})

app.get('/posts',async(req,res)=>{
  const {posts,count} = await getAllPosts(
    req.query.category,
    req.query.generation
  )
  res.send({data:{count, posts: posts.map(mapPosts)}})
})
app.get('/posts/:id',async(req,res)=>{
  const post = await getPost(req.params.id)

  res.send({data:mapPosts(post)})
})
app.get('/search',async(req,res)=>{
  try{
    const searchQuery = req.query.q
    const {posts} = await getAllPosts(searchQuery)

    res.send({
      data:posts
    })
  }catch(error){
    res.status(500).send({message:error.message})
  }
})

app.post('/add', authenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authorized" });
    }
    const userId = req.user._id;
    const { productId, count = 1 } = req.body;

    let basket = await Basket.findOne({ userId }).populate("items.productId")

    if (!basket) {
      basket = await Basket.create({
        userId,
        items: [{ productId,count }]
      });
    } else {
      const item = basket.items.find(i =>i.productId._id?.toString() === productId.toString()
      );
      if (item) {
        item.count += count;
      } else {
        basket.items.push({ productId,count });
      }
    }
    await basket.save();

    res.send({ success: true, basket:mapBasket(basket) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/add/my', authenticated,getAllBasket)


app.put('/update',authenticated,async(req,res)=>{
  try{
    const userId=req.user._id
    const {productId,count}=req.body

    if(count<1){
      return res.status(400).json()
    }
    let basket = await Basket.findOne({userId}).populate('items.productId')
    console.log(productId);
    const item = basket.items.find(i => 
      i.productId._id?.toString() === productId
    );
    
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.count = count; 
    await basket.save();
    
    res.send({ success: true, basket: mapBasket(basket) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.delete('/delete',authenticated,deleteBasket)

app.use(authenticated)

app.get('/users',hasrole([ROLE.ADMIN]),async (req,res)=>{
  const users =await getUser()

  res.send({data:users.map(mapUser)})
})
app.get('/users/roles',hasrole([ROLE.ADMIN]),async (req,res)=>{
  const roles =await getRoles()

  res.send({data:roles})
})

app.patch('/users/:id',hasrole([ROLE.ADMIN]),async (req,res)=>{
  const newUser=await updateUser(req.params.id,{
    role: req.body.roleId
  })
  res.send({data: mapUser(newUser)})
})

app.delete('/users/:id',hasrole([ROLE.ADMIN]),async (req,res)=>{
  await deleteUser(req.params.id)

  res.send({error:null})
})

mongoose
  .connect(
    "mongodb+srv://aroslavzvonok876:Zv30042005@cluster0.yedlhjt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("mongodb connect");
      console.log(`server has been started ${port}...`);
    });
  });
