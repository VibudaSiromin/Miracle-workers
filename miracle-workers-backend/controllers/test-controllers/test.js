const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

const testFilePath=path.join(__dirname,'../../store/testSuite.json');
const dataFilePathForLauncher=path.join(__dirname,'../../store/launcher.json');

const getTestPageNames= async (req, res, next)=>{
    console.log('running getPageName for test');
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
    let testFileTwo;

    try{
      const data = await fs.promises.readFile(dataFilePathForLauncher);
      testFileTwo = JSON.parse(data);
      testFileTwo.push([testPageName]);
      const newTest=JSON.stringify(testFileTwo);
      try{
        await fs.promises.writeFile(dataFilePathForLauncher,newTest);
        res.status(200).json({message:'Created test Page in launcher file'});
      }catch(err){
        console.log(err);
        res.status(500).json({message:'Error occurred when creating test sheet name in launcher file'});
        return;
      }    
    }catch(err){
      console.log(err);
      res.status(500).json({ message: 'Error reading test file' });
      return;
    }
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
      selectedTestPage.splice(0,1);
      const testRecords=selectedTestPage;
      console.log('parrot',testRecords);
      res.status(200).json({getTestRecords:testRecords})
    }catch(err){
        res.status(500).json({ message: 'Error reading test section' })
    }
  }

  const editTestPage = async (req,res,next) => {
    const testPageName=req.params.tname;
    const newTestContent=req.body.editedTestData;
    const type=req.body.type;
  
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

  ////////This is the test section//////////////

  exports.getTestPageNames=getTestPageNames;
  exports.createTestSheet=createTestSheet;
  exports.editTestPage=editTestPage;
  exports.getTestPageContent=getTestPageContent;
  exports.getHeadingsFromTest=getHeadingsFromTest;
  exports.deleteTestPage=deleteTestPage;
  exports.renameTestPageName=renameTestPageName;