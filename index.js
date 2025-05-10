import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { deleteUser, getRoles, getUser, register } from "./controller/user.js";
import { auth } from "./controller/user.js";
import mapUser from "./helper/mapUser.js";
import authenticated from "./middleware/authenticated.js";
import hasrole from "./middleware/hasrole.js";
import ROLE from "./constatns/ROLE.js";
import { updateUser } from "./controller/user.js";
import cors from "cors";

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
