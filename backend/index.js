const express = require('express');
const app=express();


app.get('/',(req,res)=>{
    res.json({
        message:"hi there this is a test app"
    })
})


app.listen(3000);