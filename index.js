// acquire express 
const express=require('express');
// app will run on this port
const port=3000;

const app=express();


app.listen(port, function(err){
    if(err){
        console.log(`ERROR While Server is going Up ${err}`);
        return;
    }
    console.log(`Server is up and running on Port: ${port}`)
})
