import express from "express"
import { configDotenv } from "dotenv"
import connectDB from "./config/database.js"
import userRouter from './routes/userRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import cookieParser from "cookie-parser"
import cors from 'cors'
import { app, server } from "./webSocket/socket.js"

configDotenv()
const port = process.env.PORT 

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials : true
}))

app.use('/api/v1/user',userRouter)
app.use('/api/v1/message',messageRouter)

server.listen(port, ()=>{
    console.log("server is working on port : ", port)
    connectDB().then(()=>console.log("DB connected")).catch((err)=>console.log(err))
})