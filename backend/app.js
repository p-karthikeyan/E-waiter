const express = require('express')
const cors = require('cors')

const dotenv=require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
const con_uri=process.env.DATABASE_URI

app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

const Restaurant=require('./models/restaurantmodel')

mongoose.connect(con_uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(result=>{
    app.listen(process.env.PORT,()=>console.log(`listening to the port 5000...`))
}).catch(err=>console.log(err))

app.get('/',(req,res)=>{
    res.send('<h1>Helloo</h1>')
})