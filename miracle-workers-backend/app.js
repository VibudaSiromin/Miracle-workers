const express=require('express');
const bodyParser =require('body-parser');
const mongoose=require('mongoose');

const settingRoutes=require('./routes/settings-routes/settings-routes');
const locatorRoutes=require('./routes/locator-routes/locator-routes');
const dataRoutes=require('./routes/data-routes/data-routes');
const launcherRoutes=require('./routes/launcher-routes/launcher-routes');
const testRoutes=require('./routes/test-routes/test-routes');
const jsonRoutes=require('./routes/json-upload')

const app=express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
    next();
})

app.use('/',dataRoutes);
app.use('/',settingRoutes);
app.use('/',locatorRoutes);
app.use('/',launcherRoutes);
app.use('/',testRoutes);
app.use('/json',jsonRoutes);
app.get('/',(req,res,next)=>{
    res.json({message:'Hi'});
})
mongoose
    .connect('mongodb+srv://RestAPI:RestAPI123@cluster0.xq2zop1.mongodb.net/miracleworkers?retryWrites=true&w=majority')
    .then(()=>{
        app.listen(5000);
    })
    .catch(err =>{
        console.log(err);
    }); 
