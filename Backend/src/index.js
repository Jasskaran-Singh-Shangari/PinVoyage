import connectDB from "./db/connectDB.js"
import app from "./app.js"
connectDB()
.then(()=>{
    app.on("error", ()=>{
        console.log("Something went wrong with the server")
    })
    app.listen(process.env.PORT, ()=>{
        console.log(`The server is listening on port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log(`Error in databse connection ${error}`)
})