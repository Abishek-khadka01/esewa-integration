const express = require("express")
const { default: mongoose } = require("mongoose")
const path = require("path")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.set("views", path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, 'public')));


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






