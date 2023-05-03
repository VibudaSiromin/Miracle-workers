const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

const dataFilePath=path.join(__dirname,'../../store/testSuite.json');

const getPageNames=async(req, res, next)=>{
    console.log('running getPageName');
    let testFile;
    try{
      const data = await fs.promises.readFile(dataFilePath);
      testFile = JSON.parse(data);
      const pageNamesArray=testFile.map(test=>test[0]);
      console.log("WoW",pageNamesArray)
      res.json({ testPageNames: pageNamesArray });
    }catch(err){
      console.log(err);
      res.status(500).json({ message: 'Error reading test file' });
      return;
    } 
  }

  const createTestSheet = async(req, res, next) => {
    let testFile;
    try{
      const data = await fs.promises.readFile(dataFilePath);
      testFile = JSON.parse(data);
    }catch(err){

    }
  }

  ////////This is the test section//////////////

  exports.getPageNames=getPageNames;
  exports.createTestSheet=createTestSheet;