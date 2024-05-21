const express = require("express")
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
app.use(cors());
app.use(express.json());

const UserModel = require('./models/Users');


mongoose.connect("mongodb+srv://murtazashahani2023:MERN1@mern1.qgjxcqd.mongodb.net/mern1?retryWrites=true&w=majority&appName=mern1")
app.get('/getUser',(req,res)=>{
    UserModel.find({}).then(function(users){
        res.json(users)
    }).catch(function(error){
        res.json(error)
    })
})

app.post('/createUser',async(req, res)=>{
    const user=req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);


})



const port = 3000;
app.listen(port, ()=>{
    console.log(`app is listening at ${port}`)
})