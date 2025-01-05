const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const conditionSchema=new Schema({
    name:{type:String, required:true},
});

module.exports=mongoose.model('Condition',conditionSchema);