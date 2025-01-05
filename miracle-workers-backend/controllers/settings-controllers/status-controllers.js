const Status=require('../../models/settings-models/status');

const getAllStatus=async(req,res,next)=>{
    let status;
    try{
        status=await Status.find();
    }
    catch(err){
        console.log(err);
    }
    res.json({settingItem:status.map(status=>status.toObject({getters:true}))});
}

const getStatusById=async(req,res,next)=>{
    const statusId=req.params.sid;
    let status;
    try{
        status=await Status.findById(statusId); 
    }catch(err){
        console.log(err);
    }
    res.json({itemRaw:status.toObject({getters:true})});
}

const deleteStatusById=async(req,res,next)=>{
    
    const statusId=req.params.sid;
    let status;
    try{
        status=await Status.findById(statusId);
    }catch(err){
        console.log(err);
    }

    try{
        await status.remove();
    }catch(err){
        console.log(err);
    }

    res.status(200).json({message:'Deleted setting Item'});
}

const createdStatus=async(req,res,next)=>{
    const {newValue}=req.body;
    const createdStatus=new Status({
        name:newValue
    });

    try{
        await createdStatus.save();
    }catch(err){
        console.log(err);
    }
    res.status(200).json({message:'Created setting Item'});
}

const editedStatus=async(req,res,next)=>{
    const { id, editedValue } = req.body;
  
    try {
      // Find the browser setting by ID
      const status = await Status.findById(id);
  
      // Update the name property with the new value
      status.name = editedValue;
  
      // Save the updated browser setting
      await status.save();
  
      res.status(200).json({ message: 'Updated setting item' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error updating setting item' });
    }
}

exports.getStatusById=getStatusById;
exports.getAllStatus=getAllStatus;
exports.deleteStatusById=deleteStatusById;
exports.createdStatus=createdStatus;
exports.editedStatus=editedStatus;