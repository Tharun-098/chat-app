import dotenv from "dotenv";
dotenv.config();

import http from 'http'; 
import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import connectDatabase from './config/db.js';
import { userRoutes } from "./router/userRouter.js";
import connectCloudinary from "./config/cloud.js";
import messageRoutes from "./router/messageRoutes.js";
import { Server } from "socket.io";

const port=process.env.PORT||4000;

const app=express()
const server=http.createServer(app);

//allowedorigins
const allowedOrigins=["http://localhost:5173","https://real-chat-app-eosin.vercel.app"]

//initialize socket io server
export const io=new Server(server,{
    cors:{allowedOrigins},credentials: true,
})

//store online users
export const userSocketMap={}

io.on('connection',(socket)=>{
    const userId=socket.handshake.query.userid;
    console.log("user connected",userId);

    if(userId) userSocketMap[userId]=socket.id;

    io.emit('getOnlineUsers',Object.keys(userSocketMap))

    socket.on('disconnect',()=>{
        console.log('user Disconnected',userId)
        delete userSocketMap[userId]
        io.emit('getOnlineUsers',Object.keys(userSocketMap))
    })
})

connectDatabase()
connectCloudinary()

//middleware
//app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}));

//routes
app.get('/',(req,res)=>{
    res.send('Api is working')
})
app.use('/user',userRoutes)
app.use('/message',messageRoutes)
if(process.env.NODE_ENV!=='production'){
    server.listen(port,()=>{
        console.log(`port is running on http://localhost:${port}`)
    })
}
export default server;
