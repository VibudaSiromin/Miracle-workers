const Instruction=require('../../models/settings-models/instruction');

const getAllInstruction=async(req,res,next)=>{
    let instructions;
    try{
        instructions=await Instruction.find();
    }
    catch(err){
        console.log(err);
    }
    res.json({settingItem:instructions.map(instruction=>instruction.toObject({getters:true}))});
}

const getInstructionById=async(req,res,next)=>{
    const instructionId=req.params.insID;
    let instruction;
    try{
        instruction=await Instruction.findById(instructionId); 
    }catch(err){
        console.log(err);
    }
    res.json({itemRaw:instruction.toObject({getters:true})});
}

const deleteInstructionId=async(req,res,next)=>{
    const instructionId=req.params.insID;
    let instruction;
    try{
        instruction=await Instruction.findById(instructionId);
    }catch(err){
        console.log(err);
    }

    try{
        await instruction.remove();
    }catch(err){
        console.log(err);
    }

    res.status(200).json({message:'Deleted setting Item'});
}

const createdInstruction=async(req,res,next)=>{
    const {newValue}=req.body;
    const createdInstruction=new Instruction({
        name:newValue
    });

    try{
        await createdInstruction.save();
    }catch(err){
        console.log(err);
    }
    res.status(200).json({message:'Created setting Item'});

}

exports.getAllInstruction=getAllInstruction;
exports.getInstructionById=getInstructionById;
exports.deleteInstructionId=deleteInstructionId;
exports.createdInstruction=createdInstruction;
