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
    res.json({itemRaw:command.toObject({getters:true})});
}

const deleteCommandById=async(req,res,next)=>{
    
    const commandId=req.params.cid;
    let command;
    try{
        command=await Command.findById(commandId);
    }catch(err){
        console.log(err);
    }

    try{
        await command.remove();
    }catch(err){
        console.log(err);
    }

    res.status(200).json({message:'Deleted setting Item'});
}

const createdCommand=async(req,res,next)=>{
    const {newValue}=req.body;
    const createdCommand=new Command({
        name:newValue
    });

    try{
        await createdCommand.save();
    }catch(err){
        console.log(err);
    }
    res.status(200).json({message:'Created setting Item'});

}

exports.getCommandById=getCommandById;
exports.getAllCommands=getAllCommands;
exports.deleteCommandById=deleteCommandById;
exports.createdCommand=createdCommand
