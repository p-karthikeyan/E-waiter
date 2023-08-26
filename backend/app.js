const express = require('express')
const cors = require('cors')
const bcrypt=require('bcrypt')
const csvParser = require('csv-parser');
const fs = require('fs');

const dotenv=require('dotenv')
dotenv.config()

app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

const mongoose = require('mongoose')
const con_uri=process.env.DATABASE_URI
mongoose.connect(con_uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(result=>{
    app.listen(process.env.PORT,()=>console.log(`listening to the port 5000...`))
}).catch(err=>console.log(err))

const Restaurant=require('./models/restaurantmodel')

const foods = [];
fs.createReadStream('indian_food.csv')
  .pipe(csvParser())
  .on('data', (row) => {
    foods.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
  });
app.get('/dishes',(req,res)=>{
    res.json(foods)
})



app.get('/',(req,res)=>{
    res.send('server is working #HOME')
})

app.post('/restaurant/register',(req,res)=>{

    const {hotelName,password,location,nofTables,listOfDishes} = req.body;

    bcrypt.genSalt(10).then(salt=>bcrypt.hash(password,salt)).then(hashedpwd=>{
        const restaurant = new Restaurant({hotelName,password:hashedpwd,location,nofTables,listOfDishes})
        restaurant.save()
        .then(rslt=>res.send(rslt))
        .catch(err=>console.log(err))
    }).catch(err=>{console.log(err)})

})