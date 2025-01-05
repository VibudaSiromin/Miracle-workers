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
    const {commandName,binaryValue}=req.body;
    const createdCommand=new Command({
        name:commandName,
        binaryValue:binaryValue
    });

    try{
        await createdCommand.save();
    }catch(err){
        console.log(err);
        res.status(200).json({message:'Error ocurred'});
    }
    res.status(200).json({message:'Created setting Item'});

}

const editedCommand=async(req,res,next)=>{
    const { id, binaryValue,newCommand } = req.body;
  
    try {
      // Find the browser setting by ID
      const command = await Command.findById(id);
  
      // Update the name property with the new value
      command.name = newCommand;
      command.binaryValue=binaryValue;
  
      // Save the updated browser setting
      await command.save();
  
      res.status(200).json({ message: 'Updated setting item' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error updating setting item' });
    }
}

exports.getCommandById=getCommandById;
exports.getAllCommands=getAllCommands;
exports.deleteCommandById=deleteCommandById;
exports.createdCommand=createdCommand;
exports.editedCommand=editedCommand;
