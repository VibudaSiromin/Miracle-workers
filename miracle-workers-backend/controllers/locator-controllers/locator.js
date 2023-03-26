const fs = require('fs');
const path = require('path');

const dataFilePath =path.join(__dirname,'locatorFile.json');

const getAllLocators = async(req, res, next) => {
    let locators;
    try{
      const data = await fs.promises.readFile(dataFilePath);
      locators = JSON.parse(data);
    }catch{
      console.log(err);
      res.status(500).json({ message: 'Error reading locator file' });
      return;
    }
    res.json({ locators: locators });
  };

  const getLocatorById = async (req, res, next) => {
    const locatorId = req.params.lid;
    let locators;
    try {
      const data = await fs.promises.readFile(dataFilePath);
      locators = JSON.parse(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error reading locator file' });
      return;
    }

    console.log("hyyyyyy",locators);
    const locatorArray=locators.locators;
    console.log("giii",locatorArray)
    let locator;
    locatorArray.forEach(element => {
      if(element.id===locatorId){
          locator=element;
      }
    });

    if (!locator) {
      res.status(404).json({ message: 'Locator not found'});
      return;
    }
    res.json({ locatorItem: locator});
  };

const deleteLocatorById=async (req,res,next)=>{
    const locatorId=req.params.lid;
    let data;
    let locators;
    try{
      data = await fs.promises.readFile(dataFilePath);
      locators = JSON.parse(data);   
    }catch(err){
      console.log(err);
      res.status(500).json({ message: 'Error reading locator file' });
      return;
    }
    const locatorArray=locators.locators;
    let locator;

    console.log(locatorArray,locator)
    const index=locatorArray.findIndex(obj => obj.id === locatorId);
    console.log("SD",index,locators)
    locatorArray.splice(index,1);
    data={
      locators:locatorArray
    }
    newData=JSON.stringify(data);
    try{
      await fs.promises.writeFile(dataFilePath,newData);
    }catch(err){
      console.log(err);
      res.status(500).json({message:'Error deleting locator'});
      return;
    }
    res.status(200).json({message:'Deleted locator'});
}

const createdLocator=async(req,res,next)=>{
  console.log('PPPPPP')
    const {newValue}=req.body;
    console.log("ggyj",newValue)
    let data;
    let locators;
    try{
      data = await fs.promises.readFile(dataFilePath);
      locators = JSON.parse(data);
    }catch(err){
      console.log(err);
      res.status(500).json({ message: 'Error reading locator file' });
      return;
    }

    const locatorArray=locators.locators;

    locatorArray.push(newValue);

    data={
      locators:locatorArray
    }
    console.log("SER",data)
    newData=JSON.stringify(data);
    try{
      await fs.promises.writeFile(dataFilePath,newData);
    }catch(err){
      console.log(err);
      res.status(500).json({message:'Error inserting locator'});
      return;
    }

    res.status(200).json({message:'Created locator'});

}

// exports.getBrowserById=getBrowserById;
// exports.getAllBrowsers=getAllBrowsers;
// exports.deleteBrowserById=deleteBrowserById;
// exports.createdBrowser=createdBrowser;

exports.getAllLocators=getAllLocators;
exports.getLocatorById=getLocatorById;
exports.deleteLocatorById=deleteLocatorById;
exports.createdLocator=createdLocator;