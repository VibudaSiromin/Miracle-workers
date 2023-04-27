const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const browserSchema=new Schema({
    name:{type:String, required:true},
});

module.exports=mongoose.model('Browser',browserSchema);