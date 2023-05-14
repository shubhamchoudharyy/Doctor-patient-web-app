const express=require("express")
const colors=require("colors")
const dotenv=require("dotenv")
const morgan=require("morgan")
const connectDB = require("./config/db")
const socket=require('socket.io')
const cors=require('cors')



dotenv.config()

connectDB();
const app=express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.use('/api/v1/user',require('./routes/userRoutes'))
app.use('/api/v1/admin',require('./routes/adminRoutes'))
app.use('/api/v1/doctor',require('./routes/doctorRoutes'))
app.use("/api/v1/messages",require('./routes/messageRoutes'));

const port=process.env.PORT || 5000

const server=app.listen(port,()=>{
    console.log(`Server running in ${process.env.NODE_MODE} Mode on port  ${process.env.PORT}` .bgCyan.white)
})

const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        Credentials:true,
    },
});

global.onlineUsers=new Map();

io.on("connection",(socket)=>{
    global.chatsocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message);
        }
    });
})