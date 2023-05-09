const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name : {type:String, required:true},
    image : {type:String, required:true},
    price : {type:Number, required:true},
    gender : {type:String, required:true},
    strikePrice :{type:Number, required:true},
    category : {type:String, required:true},
    brand : {type:String, required:true},
    rating : {type:String, required:true},
    color : {type:String},
    discount : {type:String}
},{
   versionKey : false
})

const productModel = mongoose.model("products", productSchema)

module.exports = {
   productModel
}