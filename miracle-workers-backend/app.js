const express=require('express');
const bodyParser =require('body-parser');
const mongoose=require('mongoose');

const app=express();

app.use(bodyParser.json());

mongoose
    .connect('mongodb+srv://RestAPI:RestAPI123@cluster0.xq2zop1.mongodb.net/places?retryWrites=true&w=majority')
    .then(()=>{
        app.listen(5000);
    })
    .catch(err =>{
        console.log(err);
    });
