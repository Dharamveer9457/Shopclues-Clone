const express = require("express")
const {productModel} = require("../models/product.model")
const productRouter = express.Router()

 

//get routes for all the articles
productRouter.get("/", async(req,res)=>{
    try {
        const product = await productModel.find()
        res.status(200).send({product})
    } catch (error) {
        res.status(500).json({"msg":"Error while getting products","err":error.message})
    }
})

//post routes for all the products
productRouter.post("/add", async(req,res)=>{
    try {
        const product = new productModel(req.body)
        await product.save()
        res.status(200).json({"msg":`New product have been added with name ${req.body.name}`})
    } catch (error) {
        res.status(500).json({"msg":"Error while adding an product"})
    }
})

//get by id route for product
productRouter.get("/:id", async(req,res)=>{
    try {
        const product = await productModel.findById(req.params.id)
        res.status(200).send({product})
    } catch (error) {
        res.status(500).json({"msg":"Error while getting products from an ID","err":error.message})
    }
})

//patch route for product
productRouter.patch("/update/:id", async(req,res)=>{
    try {
        const product = await productModel.findByIdAndUpdate(req.params.id,req.body)
        if(!product){
            res.status(500).json({"msg":"product not found"})
        }else{
            res.status(200).send({"msg":"product updated successfully"})
        }
    } catch (error) {
        res.status(500).json({"msg":"Error while updating Product","err":error.message})
    }
})

//DELETE route for product
productRouter.delete("/delete/:id", async(req,res)=>{
    try {
        const product = await productModel.findByIdAndDelete(req.params.id)
        if(!product){
            res.status(500).json({"msg":"product not found"})
        }else{
            res.status(200).send({"msg":"product Deleted successfully"})
        }
    } catch (error) {
        res.status(500).json({"msg":"Error while deleting an product","err":error.message})
    }
})


//Pagination

productRouter.get("/page/:pageNumber", async(req,res)=>{
    try {
        const {pageNumber} = req.params
        const skip = (pageNumber-1)*18;
        const products = await productModel.find().skip(skip).limit(18)
        res.status(200).json({products})
    } catch (error) {
        console.log(error)
        res.status(500).json({err : "Error while getting Page of Products"})
    }
})

module.exports = {
    productRouter
}