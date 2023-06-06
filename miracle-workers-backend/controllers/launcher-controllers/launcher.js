const fs = require("fs");
const path = require("path");
const launcherFilePath = path.join(__dirname,"../../store/launcher.json");

const createLauncher = async (req, res, next) => {
  try {
    const data = req.body;
    const launcherFile = data.data;
    await fs.promises.writeFile(launcherFilePath, JSON.stringify(launcherFile));
    res.status(200).json({message:'Created launcher Page'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred when creating launcher" });
  }
};

const getLauncherContent = async(req,res,next) => {
  const testPageName=req.query.testPageName;
  console.log('demon',testPageName);
  let launcherSection;
  try{
    const data = await fs.promises.readFile(launcherFilePath);
    launcherSection = JSON.parse(data);

    let index;
    if(testPageName.charAt(testPageName.length-1)==="M"){
       index = launcherSection.findIndex(launcher=>launcher[0]===testPageName);
    }else if(testPageName.charAt(testPageName.length-1)==="J"){
       index = launcherSection.findIndex(launcher=>launcher[0]===testPageName);
    }
    //const index = dataSection.findIndex(data=>data[0]===dataPageName+"M");
    const launcherDetails=launcherSection[index][1];
    res.status(200).json({getLauncherDetails:launcherDetails})
    // if(launcherSection[index].length>2){
    //   const dataRecords=launcherSection[index];
    //   dataRecords.splice(0,2);
    //   res.status(200).json({getDataRecords:dataRecords})
    // }else if(launcherSection[index].length<=2){
    //   res.status(200).json({getDataRecords:[]})
    // }
  }catch(err){
      res.status(500).json({ message: 'Error reading launcher section' })
  }
}


/////////////////////////

const editTestPage = async (req,res,next) => {
  const testPageName=req.params.tname;
  const newLauncherContent=req.body.editedData;
  const type=req.body.type;

  console.log("testPageName: ",testPageName);
  console.log("testType: ",type);
  console.log("test content: ",newLauncherContent);

  console.log()

  let launcherSection;
  try{
    const data = await fs.promises.readFile(launcherFilePath);
    launcherSection = JSON.parse(data);

    let index;
    let testPage;
    let newLauncherPage;
    if(type==="Manual"){
      index = launcherSection.findIndex(launcher=>launcher[0]===testPageName+"M");
      // testPage=testSection.find(test=>test[0]===testPageName+"M");
      newLauncherPage=[testPageName+"M",newLauncherContent];
    }else if(type==="Json"){
      index = launcherSection.findIndex(launcher=>launcher[0]===testPageName+"J");
      //testPage=testSection.find(test=>test[0]===testPageName+"J");
      newLauncherPage=[testPageName+"J",newLauncherContent];
    }
    
    console.log('new launcher page',newLauncherPage)

    launcherSection[index]=newLauncherPage;
    const newLauncherSection=JSON.stringify(launcherSection);
    try{
      await fs.promises.writeFile(launcherFilePath,newLauncherSection);
      res.status(200).json({message:'Edited launcher content'});
    }catch(err){
      console.log(err);
      res.status(500).json({message:'Error occurred when creating launcher content'});
    }
  }catch(err){
    console.log(err)
    res.status(500).json({ message: 'Error reading launcher section' });
  }
}

const deleteTestPageInLauncher = async(req,res,next) => {
  const testPageName=req.query.testPageName;

  let launcherSection;
  try{
    const data = await fs.promises.readFile(launcherFilePath);
    launcherSection = JSON.parse(data);

    let index;
    index = launcherSection.findIndex(test=>test[0]===testPageName+"M");
    launcherSection.splice(index,1);
    const newTestSection=JSON.stringify(launcherSection);
    try{
      await fs.promises.writeFile(launcherFilePath,newTestSection);
      res.status(200).json({message:'Edited launcher content'});
    }catch(err){
      console.log(err);
      res.status(500).json({message:'Error occurred when creating launcher content'});
    }
  }catch(err){
    console.log(err)
    res.status(500).json({ message: 'Error reading launcher section' });
  }
}

const renameTestPageNameInLauncher =async (req,res,next) =>{
  const newTestPageName=req.body.newTestPageName;
  const pageIndex=req.body.pageIndex;
  // console.log('soda',newTestPageName);
  // console.log('coca',pageIndex);
  

  let launcherSection;
  try{
    const data = await fs.promises.readFile(launcherFilePath);
    launcherSection = JSON.parse(data);
    launcherSection[pageIndex][0]=newTestPageName+"M";
    const newTestSection=JSON.stringify(launcherSection);
    try{
      await fs.promises.writeFile(launcherFilePath,newTestSection);
      res.status(200).json({message:'Edited launcher content'});
    }catch(err){
      console.log(err);
      res.status(500).json({message:'Error occurred when creating launcher content'});
    }

  }catch(err){
    console.log(err)
    res.status(500).json({ message: 'Error reading launcher section' });
  }
}

const getAllLauncherData = async(req,res,next) => {
  let launcherSection;
  try{
    const data=await fs.promises.readFile(launcherFilePath);
    launcherSection = JSON.parse(data);
    res.status(200).json({allLauncherData:launcherSection});
  }catch(err){
    console.log(err)
    res.status(500).json({ message: 'Error reading launcher section' });
  }
}


exports.createLauncher = createLauncher;
exports.editTestPage=editTestPage;
exports.getLauncherContent=getLauncherContent;
exports.deleteTestPageInLauncher=deleteTestPageInLauncher;
exports.renameTestPageNameInLauncher=renameTestPageNameInLauncher;
exports.getAllLauncherData=getAllLauncherData;