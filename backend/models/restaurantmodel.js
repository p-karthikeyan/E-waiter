const mongoose=require('mongoose')

const restaurant_schema=new mongoose.Schema({
    hotelName:String,
    hotelId:String,
    nofTables:Number,
    nofDishes:Number,
    listOfDishes:[],
})

const Restaurant=mongoose.model('Restaurant',restaurant_schema)

module.exports=Restaurant;