const express = require("express");
const app = express();
const {connection} = require("./db");
const { userRouter } = require("./routes/user.routes")
const {productRouter} = require("./routes/product.route")
const {auth} = require("./middlewares/auth")
const cors = require("cors")
require('dotenv').config()


app.use(express.json())
app.use(cors())

app.use("/users",userRouter)

// app.use(auth)
app.use("/products",productRouter)



app.listen(process.env.port, async ()=>{
    try {
        await connection
        console.log(`Connected to MongoDB at 4500...`)
    } catch (error) {
        console.log(error)
        console.log("Something went wrong while connecting to DB")
    }
})