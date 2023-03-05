const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const testTypeSchema=new Schema({
    name:{type:String, required:true},
});

module.exports=mongoose.model('TestType',testTypeSchema);