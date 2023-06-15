const fs = require('fs');
const path = require('path');
const { argv0 } = require('process');

// const dataFilePath =path.join(__dirname,'locatorFile.json');

const locatorFilePath=path.join(__dirname,'../../store/locator.json');


//get locator sheet names 
const getPageNames=async(req, res, next)=>{
  const locatorName=req.body.lname;
  let locatorFile;
  try{
    const data = await fs.promises.readFile(locatorFilePath);
    locatorFile = JSON.parse(data);
  }catch{
    console.log(err);
    res.status(500).json({ message: 'Error reading locator file' });
    return;
  }
  const pageNamesArray=locatorFile.map(locator=>locator[0]);
  console.log("Doooo",pageNamesArray)
  res.json({ locatorsPageNames: pageNamesArray });
}

const getLocatorByPage = async(req, res, next) => {
  //////////////////////check this one again.check slice method again/////////////
  let locatorFile;
  const locatorPageName=req.params.lname;
  try{
      const data = await fs.promises.readFile(locatorFilePath);
      locatorFile = JSON.parse(data);
      const locatorPage=locatorFile.find(locator=>locator[0]===locatorPageName);
      if(locatorPage!==null || locatorPage!==undefined){
        arrayWithoutLocatorName=locatorPage.slice(1,locatorPage.length)
        res.json({ locators: arrayWithoutLocatorName});
      }    
    }catch(err){ 
      console.log(err);
      res.status(500).json({ message: 'Error reading locator file' });
      return;
    }
    
  };    


  const createLocatorByPage = async (req, res, next) => {
    let locatorFile;
    const locatorPageName=req.body.pageName;
    try{
        const data = await fs.promises.readFile(locatorFilePath);
        locatorFile = JSON.parse(data);
      }catch{
        console.log(err);
        res.status(500).json({ message: 'Error reading locator file' });
        return;
      }
    locatorFile.push([locatorPageName]);
    const newData=JSON.stringify(locatorFile);
    try{
      await fs.promises.writeFile(locatorFilePath,newData);
    }catch(err){
      console.log(err);
      res.status(500).json({message:'Error occurred when creating locator'});
      return;
    }
    res.status(200).json({message:'Created locator Page'});
  };

const editLocatorPage=async (req,res,next)=>{
    const locatorPageName=req.params.lname;
    const newLocator=req.body.editedLocator;
    console.log("gooooo",newLocator)
    
    let locatorFile;
    try{
      const data = await fs.promises.readFile(locatorFilePath);
      locatorFile = JSON.parse(data);   
    }catch(err){
      console.log(err);
      res.status(500).json({ message: 'Error reading locator file' });
      return;
    }
    const index = locatorFile.findIndex(locator=>locator[0]===locatorPageName);
    const newLocatorPage=[];
    newLocatorPage[0]=locatorPageName;
    for(let i=0;i<newLocator.length;i++){
      newLocatorPage[i+1]=newLocator[i]
    }
    console.log("Hoooo",newLocatorPage);
    locatorFile[index]=newLocatorPage;
    newData=JSON.stringify(locatorFile);
    console.log("Yoooo",newData)
    try{
      await fs.promises.writeFile(locatorFilePath,newData);
    }catch(err){
      console.log(err);
      res.status(500).json({message:'Error occurred when creating locator'});
      return;
    }
    res.status(200).json({message:'Edited locator'});
}

const deleteLocatorPage=async(req,res,next)=>{
  const locatorPageName=req.query.locatorPageName;
    //const locatorPageName=req.params.locatorPageName;
    let locatorFile;
    try{
      data = await fs.promises.readFile(locatorFilePath);
      locatorFile = JSON.parse(data);
    }catch(err){
      console.log(err);
      res.status(500).json({ message: 'Error reading locator file' });
      return;
    }
    const index = locatorFile.findIndex(locator=>locator[0]===locatorPageName);
    locatorFile.splice(index,1);

    const newData=JSON.stringify(locatorFile);
    try{
      await fs.promises.writeFile(locatorFilePath,newData);
    }catch(err){
      console.log(err);
      res.status(500).json({message:'Error occurred when deleting locator'});
      return;
    }
    res.status(200).json({message:'Deleted locator'});
}

const ranameLocatorPageName = async(req,res,next) => {
  const newLocatorPageName=req.body.newLocatorPageName;
  const pageIndex=req.body.pageIndex;
  console.log('soda',newLocatorPageName);
  console.log('coca',pageIndex);
  

  let locatorSection;
  try{
    const data = await fs.promises.readFile(locatorFilePath);
    locatorSection = JSON.parse(data);
    locatorSection[pageIndex][0]=newLocatorPageName;
    const newTestSection=JSON.stringify(locatorSection);
    try{
      await fs.promises.writeFile(locatorFilePath,newTestSection);
      res.status(200).json({message:'Edited test content'});
    }catch(err){
      console.log(err);
      res.status(500).json({message:'Error occurred when creating test content'});
    }

  }catch(err){
    console.log(err)
    res.status(500).json({ message: 'Error reading test section' });
  }
}


const getHeadings = (req,res,next) => {
  res.json({getHeadings:['Name','Value']})
}

const getNoofRaws = async(req,res,next) => {
  const LocatorPageName = req.query.pageName;
  let locatorSection;

  try{
    const data = await fs.promises.readFile(locatorFilePath);
    locatorSection = JSON.parse(data);

    const index = locatorSection.findIndex(locator=>locator[0]===LocatorPageName);
    const selectedLocatorSheet=locatorSection[index];
    const sheetLength=selectedLocatorSheet.length;
    res.status(200).json({noofRaws:sheetLength-1});
  }catch(err){
      res.status(500).json({ message: 'Error reading locator section' });
  }

}

const getLocatorNames = async(req,res,next) => {
  const LocatorPageName = req.query.locatorName;
  let locatorSection;

  try{
    const data = await fs.promises.readFile(locatorFilePath);
    locatorSection = JSON.parse(data);
    const index = locatorSection.findIndex(locator=>locator[0]===LocatorPageName);
    const selectedLocatorSheet=locatorSection[index];
    const locatorNames = [];
    for(let i=1;i<selectedLocatorSheet.length;i++){
      const locatorObj=selectedLocatorSheet[i];
      const locatorName=locatorObj['Locator Name'];
      locatorNames.push(locatorName);
    }
    res.status(200).json({locatorNames:locatorNames});
  }catch(err){
      res.status(500).json({ message: 'Error reading locator section' })
  }

}

const getAllLocatorData = async (req,res,next) => {
  let locatorSection;
  try{
    const data = await fs.promises.readFile(locatorFilePath);
    locatorSection = JSON.parse(data);
    res.status(200).json({locatorSection:locatorSection})  
  }catch(err){
    res.status(500).json({message: 'Error reading locator section'})
  }
}


exports.getPageNames=getPageNames;
exports.getLocatorByPage=getLocatorByPage;
exports.createLocatorByPage=createLocatorByPage;
exports.deleteLocatorPage=deleteLocatorPage;
exports.editLocatorPage=editLocatorPage;
exports.ranameLocatorPageName=ranameLocatorPageName;
exports.getHeadings=getHeadings;
exports.getNoofRaws=getNoofRaws;
exports.getLocatorNames=getLocatorNames;
exports.getAllLocatorData=getAllLocatorData;