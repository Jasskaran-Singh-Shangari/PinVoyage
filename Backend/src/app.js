import express from "express"
import cors from "cors"
import pinRouter from "./routes/pins.routes.js"
import webhookRouter from "./routes/webhook.routes.js"
import userRouter from "./routes/user.routes.js"
import {clerkMiddleware} from "@clerk/express"

const app=express()

// MIDDLEWARES

app.use(cors())
// app.use(clerkMiddleware())
app.use("/api/webhook", webhookRouter)
app.use(express.json())




// ROUTES

app.use("/api/pins", pinRouter)
app.use("/user", userRouter )


export default app;