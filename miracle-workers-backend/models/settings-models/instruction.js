const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const instructionSchema=new Schema({
    name:{type:String, required:true},
});

module.exports=mongoose.model('Instruction',instructionSchema);