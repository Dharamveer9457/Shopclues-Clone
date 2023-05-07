const express = require("express")
const {userModel} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
const bcrypt = require('bcrypt');



//User Register Route
userRouter.post("/register", async (req,res)=>{
    const {username,email,password,gender,age,city} = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash)=>{
           if(err) res.send({"msg":"Something went wrong","err":err.message})
           else{
            const user = new userModel({username,email,password:hash,gender,age,city})
            await user.save()
            res.status(200).send({"msg":"New User has been registered"})
           }
        })
    } catch (err) {
        res.status(500).send({"err": err.message})
    }
})


//User Login Route
userRouter.post("/login", async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=>{
                if(result){
                    let token = jwt.sign({userID:user[0]._id},"masai")
                    res.status(200).send({"msg":"User logged in", "token":token})
                }else{
                    res.status(500).send({"msg": "Wrong Credentials"})
                }
            });
        }else{
            res.status(500).send({"msg": "Wrong Credentials"})
        }
    } catch (err) {
        res.status(500).send({"err": err.message})
    }

})


module.exports = {
    userRouter
}