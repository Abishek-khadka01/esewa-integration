import express from "express"
import dotenv from "dotenv"
dotenv.config()
import path from "path"
import mongoose from "mongoose"
const __dirname = path.join(import.meta.dirname)
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname,"views"))

app.set('view engine', 'ejs');

// database connection
(async function connectTodatabase(){
    try {
            await mongoose.connect(process.env.DB_URI)
            console.log("MongoDb connected")
            app.listen(process.env.PORT || 4000, ()=>{
                console.log(`App is running at port ${process.env.PORT || 4000}`)
            })


    } catch (error) {
        console.log(`Error in connecting the database ${error.message}`)
        process.exit(1)

    }


} )()

// creating the fake products
// import { createFakeItemsData } from "./utils/dummydata.js"
// createFakeItemsData()

import { PaymentRouter } from "./Routes/Payment.routes.js"
app.use("/", PaymentRouter)

app.get("/success", (req,res)=>{
    res.render("success.ejs")
})

app.get("/error", (req,res)=>{
    res.render("error.ejs")
})




