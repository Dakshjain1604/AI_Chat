import express from "express"
import http from "http"
import {Server} from "socket.io"
import cors from "cors"
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes"
import chatService from "./routes/chatService"

const app = express()
app.use(express.json()); 
app.use(cors());

const server=http.createServer(app);
const io=new Server(server,{
    cors:{origin:'*'},
})

app.use('/user',userRoutes);
app.use('/chat',chatRoutes);

io.on("connection",(socket)=>{
    console.log("User Connected:",socket.id);

    socket.on("joinRoom",(room)=>{
        socket.join(room);
        console.log(`${socket.id} joined room :${room}`);
    });

    socket.on("chatMessage",async({userId,room,msg})=>{
        const savedMsg=await chatService.saveMessage(userId,room,msg);
        io.to(room).emit("chatMessage",savedMsg)
    });
    
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
    });
});

app.listen(4000);
