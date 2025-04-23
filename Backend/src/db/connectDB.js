import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB=async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log(`The database is connected ${connectionInstance.connection}`)
    } catch (error) {
        console.log(`Error while connecting to the databse: ${error}`)
    }
}

export default connectDB;