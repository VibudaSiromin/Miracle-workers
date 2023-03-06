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

exports.getStatusById=getStatusById;
exports.getAllStatus=getAllStatus;
exports.deleteStatusById=deleteStatusById;
exports.createdStatus=createdStatus;
