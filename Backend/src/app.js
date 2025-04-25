import express from "express"
import cors from "cors"
import pinRouter from "./routes/pins.routes.js"

const app=express()

// MIDDLEWARES

app.use(cors())
app.use(express.json())




// ROUTES

app.use("/api/pins", pinRouter)


export default app;