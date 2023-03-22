const Condition=require('../../models/settings-models/condition');

const getAllConditions=async(req,res,next)=>{
    let conditions;
    try{
        conditions=await Condition.find();
    }
    catch(err){
        console.log(err);
    }
    res.json({settingItem:conditions.map(condition=>condition.toObject({getters:true}))});
}

const getConditionById=async(req,res,next)=>{
    const conditionId=req.params.conId;
    let condition;
    try{
        condition=await Condition.findById(conditionId); 
    }catch(err){
        console.log(err);
    }
    res.json({itemRaw:condition.toObject({getters:true})});
}

const deleteConditionById=async(req,res,next)=>{
    const conditionId=req.params.conid;
    let condition;
    try{
        condition=await Condition.findById(conditionId);
    }catch(err){
        console.log(err);
    }

    try{
        await condition.remove();
    }catch(err){
        console.log(err);
    }

    res.status(200).json({message:'Deleted setting Item'});
}

const createdCondition=async(req,res,next)=>{
    const {newValue}=req.body;
    const createdCondition=new Condition({
        name:newValue
    });

    try{
        await createdCondition.save();
    }catch(err){
        console.log(err);
    }
    res.status(200).json({message:'Created setting Item'});

}

exports.getAllConditions=getAllConditions;
exports.getConditionById=getConditionById;
exports.deleteConditionById=deleteConditionById;
exports.createdCondition=createdCondition;
