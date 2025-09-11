const express = require('express');
const app=express();
const cors=require('cors');
app.use(cors());



const userRoutes=require("./routes/userRoutes");

app.get('/',(req,res)=>{
    res.json({
        message:"hi there this is a test app"
    })
})


app.use('/user',userRoutes);


app.listen(3000);