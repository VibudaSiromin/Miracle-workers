const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const jsonSchema=new Schema({
    file:{type:Object, required:true},
});

module.exports=mongoose.model('Json',jsonSchema);