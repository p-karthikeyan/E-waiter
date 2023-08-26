const mongoose=require('mongoose')

const restaurant_schema=new mongoose.Schema({
    hotelName:String,
    password:String,
    location:String,
    nofTables:Number,
    listOfDishes:[
        {
            dishName:String,
            price:Number,
            inStock:Boolean
        }
    ],
})

const Restaurant=mongoose.model('restaurant',restaurant_schema)

module.exports=Restaurant;