const Browser=require('../../models/settings-models/browser');

const getAllBrowsers=async(req,res,next)=>{
    let browsers;
    try{
        browsers=await Browser.find();
    }
    catch(err){
        console.log(err);
    }
    res.json({settingItem:browsers.map(command=>command.toObject({getters:true}))});
}

const getBrowserById=async(req,res,next)=>{
    const browserId=req.params.cid;
    let browser;
    try{
        browser=await Browser.findById(browserId); 
    }catch(err){
        console.log(err);
    }

}


exports.getBrowserById=getBrowserById;
exports.getAllBrowsers=getAllBrowsers;
