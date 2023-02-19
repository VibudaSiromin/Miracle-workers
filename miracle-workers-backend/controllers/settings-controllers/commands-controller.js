const Command=require('../../models/settings-models/command');

const getAllCommands=async(req,res,next)=>{
    let commands;
    try{
        commands=await Command.find();
    }
    catch(err){
        console.log(err);
    }
    res.json({settingItem:commands.map(command=>command.toObject({getters:true}))});
}

const getCommandById=async(req,res,next)=>{
    const commandId=req.params.cid;
    let command;
    try{
        command=await Command.findById(commandId); 
    }catch(err){
        console.log(err);
    }

}


exports.getCommandById=getCommandById;
exports.getAllCommands=getAllCommands;
