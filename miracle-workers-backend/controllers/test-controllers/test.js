const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

const testFilePath=path.join(__dirname,'../../store/testSuite.json');
const launcherFilePath=path.join(__dirname,'../../store/launcher.json');
const dataFilePath=path.join(__dirname,'../../store/data.json');
const locatorFilePath=path.join(__dirname,'../../store/locator.json');

const getTestPageNames= async (req, res, next)=>{
    let testFile;
    try{
      const data = await fs.promises.readFile(testFilePath);
      testFile = JSON.parse(data);
      const pageNamesArray=testFile.map(test=>test[0]);
      console.log("rock",pageNamesArray)
      res.json({ testPageNames: pageNamesArray });
    }catch(err){
      console.log(err);
      res.status(500).json({ message: 'Error reading test file' });
      return;
    } 
  }

  const createTestSheet = async(req, res, next) => {
    const testPageName=req.body.pageName;
    let testFile;
    try{
      const data = await fs.promises.readFile(testFilePath);
      testFile = JSON.parse(data);
      testFile.push([testPageName]);
      const newTest=JSON.stringify(testFile);
      try{
        await fs.promises.writeFile(testFilePath,newTest);
        res.status(200).json({message:'Created test Page'});
      }catch(err){
        console.log(err);
        res.status(500).json({message:'Error occurred when creating test file'});
        return;
      }    
    }catch(err){
      console.log(err);
      res.status(500).json({ message: 'Error reading test file' });
      return;
    }

    //add test sheets names to launcher.js
    //let testFileTwo;

    // try{
    //   const data = await fs.promises.readFile(dataFilePathForLauncher);
    //   testFileTwo = JSON.parse(data);
    //   testFileTwo.push([testPageName]);
    //   const newTest=JSON.stringify(testFileTwo);
    //   try{
    //     await fs.promises.writeFile(dataFilePathForLauncher,newTest);
    //     res.status(200).json({message:'Created test Page in launcher file'});
    //   }catch(err){
    //     console.log(err);
    //     res.status(500).json({message:'Error occurred when creating test sheet name in launcher file'});
    //     return;
    //   }    
    // }catch(err){
    //   console.log(err);
    //   res.status(500).json({ message: 'Error reading test file' });
    //   return;
    // }
  }

  const getHeadingsFromTest =async(req,res,next) => {
    const testSuiteHeadings=[
      "group",
      "instruction",
      "command",
      "locator",
      "locatorParameter",
      "data",
      "swapResult",
      "branchSelection",
      "action",
      "comment",
    ]

    res.status(200).json({getTestHeadings:testSuiteHeadings})
  }

  const getTestPageContent = async(req,res,next) => {
    const testPageName=req.query.testPageName;
    let testSection;
    try{
      const data = await fs.promises.readFile(testFilePath);
      testSection = JSON.parse(data);
  
      let index;
      if(testPageName.charAt(testPageName.length-1)==="M"){
         index = testSection.findIndex(test=>test[0]===testPageName);
      }else if(testPageName.charAt(testPageName.length-1)==="J"){
         index = testSection.findIndex(test=>test[0]===testPageName);
      }
      //const index = dataSection.findIndex(data=>data[0]===dataPageName+"M");
      const selectedTestPage=testSection[index];
      console.log("shark*****************",testSection[index]);
      if(selectedTestPage===undefined){
        const testRecords=[];
        res.status(200).json({getTestRecords:testRecords})
      }else{
        selectedTestPage.splice(0,1);
        const testRecords=selectedTestPage;
        res.status(200).json({getTestRecords:testRecords})
      }
    }catch(err){
        res.status(500).json({ message: 'Error reading test section' })
    }
  }

  const editTestPage = async (req,res,next) => {
    const testPageName=req.params.tname;
    const newTestContent=req.body.editedTestData;
    const type=req.body.type;
  
    console.log('NOAHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
    console.log("testPageName: ",testPageName);
    console.log("Type: ",type);
    console.log("data content: ",newTestContent);
  
    let testSection;
    try{
      const data = await fs.promises.readFile(testFilePath);
      testSection = JSON.parse(data);
  
      let index;
      let newTestPage;
      if(type==="Manual"){
        console.log('MSIIIIIIIIIIIIIII');
        index = testSection.findIndex(test=>test[0]===testPageName+"M");
        newTestPage=[testPageName+"M",...newTestContent];
      }else if(type==="Json"){
        index = testSection.findIndex(test=>test[0]===testPageName+"J");
        newTestPage=[testPageName+"J",...newTestContent];
      }
      
      testSection[index]=newTestPage;
      const newTestSection=JSON.stringify(testSection);
      try{
        await fs.promises.writeFile(testFilePath,newTestSection);
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

  const deleteTestPage = async(req,res,next) => {
    const testPageName=req.query.testPageName;

    let testSection;
    try{
      const data = await fs.promises.readFile(testFilePath);
      testSection = JSON.parse(data);

      let index;
      index = testSection.findIndex(test=>test[0]===testPageName+"M");
      testSection.splice(index,1);
      const newTestSection=JSON.stringify(testSection);
      try{
        await fs.promises.writeFile(testFilePath,newTestSection);
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

  const renameTestPageName =async (req,res,next) =>{
    const newTestPageName=req.body.newTestPageName;
    const pageIndex=req.body.pageIndex;
    console.log('soda',newTestPageName);
    console.log('coca',pageIndex);
    

    let testSection;
    try{
      const data = await fs.promises.readFile(testFilePath);
      testSection = JSON.parse(data);
      testSection[pageIndex][0]=newTestPageName+"M";
      const newTestSection=JSON.stringify(testSection);
      try{
        await fs.promises.writeFile(testFilePath,newTestSection);
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

  const getAllTestData = async(req,res,next) => {
    let testSection;
    try{
      const data = await fs.promises.readFile(testFilePath);
      testSection = JSON.parse(data);
      res.status(200).json({allTestData:testSection});
    }catch(err){
      console.log(err)
      res.status(500).json({ message: 'Error reading test section' });
    }

  }

  const getLoopName = async(req,res,next) => {
    const testPageName = req.query.testPageName;
    let testSection;
    console.log('ssssssssssssssssssssssssssss',testPageName);
    try{
      const data = await fs.promises.readFile(testFilePath);
      testSection = JSON.parse(data);
      let index;
      index = testSection.findIndex(test=>test[0]===testPageName+"M");
      const selectedTestSheet = testSection[index];
      for(let i=selectedTestSheet.length-1;i>0;i--){
        const testObject=selectedTestSheet[i];

        const command = testObject['command'];
        const parts = command.split('.');
        if(parts[0]==="While"){
          console.log('^^^^^^^^^^^^^^^^^^^^^',command); 
          res.status(200).json({
            command:command,
            data:testObject['data']
          })
          return;
        }
      }
      res.status(200).json({
        command:null,
        data:null
      })
    }catch(err){
      console.log(err);
      res.status(500).json({ message: 'Error reading test section' })
    }

  }

  const getAllLoopNames = async(req,res,next) => {
    const testPageName = req.query.testPageName;
    let testSection;

    try{
      const data = await fs.promises.readFile(testFilePath);
      testSection = JSON.parse(data);
      let index;
      index = testSection.findIndex(test=>test[0]===testPageName+"M");
      const selectedTestSheet = testSection[index];
      const loopArr=[];
      for(let i=selectedTestSheet.length-1;i>0;i--){
        const testObject=selectedTestSheet[i];
        const command = testObject['command'];
        const parts = command.split('.');
        if(parts[0]==="While"){
          const data=testObject['data'];
          if(parts[1]==="DataExists"){
            const parts = data.split(':');
            const loopName = parts[2];
            loopArr.push(loopName);
          }else if(parts[1]==='Count'){
            const firstSplit = data.split('|');
            const secondSplit = firstSplit[0].split(':')
            const loopName = secondSplit[1];
            loopArr.push(loopName);
          }
        }
      }
      res.status(200).json({loopArray:loopArr})
    }catch(err){
      console.log(err);
      res.status(500).json({ message: 'Error reading test section' })
    }
  }

  const getReferedDataPages = async(req,res,next) => {
    
  }

  const deleteData = async(req,res,next) => {
    let testSection=[];
    let launcherSection=[];
    let dataSection=[];
    let locatorSection=[];
    const newTest=JSON.stringify(testSection);
    const newLauncher = JSON.stringify(launcherSection);
    const newData = JSON.stringify(dataSection);
    const newLocator=JSON.stringify(locatorSection);
    try{
      await fs.promises.writeFile(testFilePath,newTest);
      await fs.promises.writeFile(launcherFilePath,newLauncher);
      await fs.promises.writeFile(dataFilePath,newData);
      await fs.promises.writeFile(locatorFilePath,newLocator);
      res.status(200).json({message:'Cleaned all sections'});
    }catch(err){
      console.log(err);
      res.status(500).json({message:'Error occurred when cleaning sections'});
      return;
    }    
  }

  ////////This is the test section//////////////

  exports.getTestPageNames=getTestPageNames;
  exports.createTestSheet=createTestSheet;
  exports.editTestPage=editTestPage;
  exports.getTestPageContent=getTestPageContent;
  exports.getHeadingsFromTest=getHeadingsFromTest;
  exports.deleteTestPage=deleteTestPage;
  exports.renameTestPageName=renameTestPageName;
  exports.getAllTestData=getAllTestData;
  exports.getLoopName=getLoopName;
  exports.getAllLoopNames=getAllLoopNames;
  exports.getReferedDataPages=getReferedDataPages;
  exports.deleteData=deleteData;