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

const createdBrowser=async(req,res,next)=>{
    const {newValue}=req.body;
    const createdBrowser=new Browser({
        name:newValue
    });

    try{
        await createdBrowser.save();
    }catch(err){
        console.log(err);
    }
    res.status(200).json({message:'Created setting Item'});

}

const editedBrowser=async(req,res,next)=>{
        const { id, editedValue } = req.body;
      
        try {
          // Find the browser setting by ID
          const browser = await Browser.findById(id);

          // Update the name property with the new value
          browser.name = editedValue;
          console.log("ppppppppppp",editedValue)

          // Save the updated browser setting
          await browser.save();
          res.status(200).json({ message: 'Updated setting item' });
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: 'Error updating setting item' });
        }
}

exports.getBrowserById=getBrowserById;
exports.getAllBrowsers=getAllBrowsers;
exports.deleteBrowserById=deleteBrowserById;
exports.createdBrowser=createdBrowser;
exports.editedBrowser=editedBrowser;
