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
    const browserId=req.params.bid;
    let browser;
    try{
        browser=await Browser.findById(browserId); 
    }catch(err){
        console.log(err);
    }
    res.json({itemRaw:browser.toObject({getters:true})});
}

const deleteBrowserById=async(req,res,next)=>{
    const browserId=req.params.bid;
    let browser;
    try{
        browser=await Browser.findById(browserId); 
    }catch(err){
        console.log(err);
    }

    try{
        await browser.remove();
    }catch(err){
        console.log(err);
    }

    res.status(200).json({message:'Deleted setting Item'});
}

exports.getBrowserById=getBrowserById;
exports.getAllBrowsers=getAllBrowsers;
exports.deleteBrowserById=deleteBrowserById;
