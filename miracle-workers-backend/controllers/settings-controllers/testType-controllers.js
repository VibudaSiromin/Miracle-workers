const TestType=require('../../models/settings-models/testType');

const getAllTestTypes=async(req,res,next)=>{
    let testTypes;
    try{
        testTypes=await TestType.find();
    }
    catch(err){
        console.log(err);
    }
    res.json({settingItem:testTypes.map(testType=>testType.toObject({getters:true}))});
}

const getTestTypeById=async(req,res,next)=>{
    const testTypeId=req.params.tid;
    let testType;
    try{
        testType=await TestType.findById(testTypeId); 
    }catch(err){
        console.log(err);
    }
    res.json({itemRaw:testType.toObject({getters:true})});
}

const deleteTestTypeById=async(req,res,next)=>{
    
    const testTypeId=req.params.tid;
    let testType;
    try{
        testType=await TestType.findById(testTypeId);
    }catch(err){
        console.log(err);
    }

    try{
        await testType.remove();
    }catch(err){
        console.log(err);
    }

    res.status(200).json({message:'Deleted setting Item'});
}

const createdTestType=async(req,res,next)=>{
    const {newValue}=req.body;
    const createdTestType=new TestType({
        name:newValue
    });

    try{
        await createdTestType.save();
    }catch(err){
        console.log(err);
    }
    res.status(200).json({message:'Created setting Item'});

}

exports.getTestTypeById=getTestTypeById;
exports.getAllTestTypes=getAllTestTypes;
exports.deleteTestTypeById=deleteTestTypeById;
exports.createdTestType=createdTestType;
