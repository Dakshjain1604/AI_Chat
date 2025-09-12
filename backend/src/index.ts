import express from "express"
import prisma from "./prisma"
import cors from "cors"
import userRoutes from "./routes/userRoutes";
const app = express()
app.use(express.json());
app.use(cors());

//importing the routes



app.use('/user',userRoutes);





app.listen(4000);
