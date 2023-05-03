const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');
// import { useLocation } from "react-router-dom";

// const location=useLocation();

const dataFilePath=path.join(__dirname,'../../store/data.json');
// controller for fetching datasheets
// const getDataSheetByLinkName = (req,res,next)=>{
//     const linkName=req.query.DataSheetName;
//     fs.readFile(dataFilePath, 'utf8', (err, data) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         const DataSection = JSON.parse(data);//dataSection => whole data of the dataFile.json
//         const findDataSheet=DataSection.find((dataSheet)=>{//dataSheet => every data sheet has a unique name
//             if(dataSheet[0]===linkName){ 
//                 return dataSheet
//             }
//         });
//         console.log(findDataSheet);
//         res.status(200)
//         .json(findDataSheet);
//       });
   
// }

//controller for creating dataSheets

// const createDataSheet = (req,res,next) => {
//     const {sectionName,linkName,dataRecord} =req.body;
//     console.log('SIA');
//     const newDataSheet = [linkName,...dataRecord];

//     fs.stat(dataFilePath,(err,stats)=>{
//         if (err) {
//             console.error(err);
//             return;
//           }
//           if (stats.size===0) {
//             const dataRecordArr=[newDataSheet]
//             fs.writeFile(dataFilePath, JSON.stringify(dataRecordArr), (err) => {
//                 if (err) {
//                   console.error(err);
//                   return;
//                 }
//                 console.log('Data written to file');
//               });
//               res.status(201);
//               res.json(newDataSheet);
//           }else{
//             fs.readFile(dataFilePath, 'utf8', (err, data) => {
//                 if (err) {
//                   console.error(err);
//                   return;
//                 }
//                 const dataSection = JSON.parse(data);
//                 for(let i=0;i<dataSection.length;i++){
//                   if(linkName===dataSection[i][0]){
//                     dataSection[i]=newDataSheet;

//                     fs.writeFile(dataFilePath, JSON.stringify(dataSection), (err) => {
//                       if (err) {
//                         console.error(err);
//                         return;
//                       }
//                       console.log('Data written to file');
//                     });
//                     res.status(201);
//                     res.json(dataSection);
//                     return;
//                   }
//                 }
//                 dataSection.push(newDataSheet);
//                 console.log('van',dataSection);
//                 fs.writeFile(dataFilePath, JSON.stringify(dataSection), (err) => {
//                     if (err) {
//                       console.error(err);
//                       return;
//                     }
//                     console.log('Data written to file');
//                   });
//                 res.status(201);
//                 res.json(dataSection);
        
//               });
//           }
//     })
// }

///////////////

//get data sheet names

const getPageNames=async(req, res, next)=>{
  console.log('running getPageName');
  let dataFile;
  try{
    const data = await fs.promises.readFile(dataFilePath);
    dataFile = JSON.parse(data);
    const pageNamesArray=dataFile.map(data=>data[0]);
    console.log("WoW",pageNamesArray)
    res.json({ dataPageNames: pageNamesArray });
  }catch(err){
    console.log(err);
    res.status(500).json({ message: 'Error reading data file' });
    return;
  } 
}

//////////////////////

const createDataSheetOne = async (req, res, next) => {
  console.log('running createDataSheetOne');
  let dataFile;
  const dataPageName=req.body.pageName;
  try{
      const data = await fs.promises.readFile(dataFilePath);
      dataFile = JSON.parse(data);
      dataFile.push([dataPageName,[]]);
      const newData=JSON.stringify(dataFile);
        try{
          console.log('hava createDataSheetOne');
          await fs.promises.writeFile(dataFilePath,newData);
          res.status(200).json({message:'Created locator Page'});
        }catch(err){
          console.log(err);
          res.status(500).json({message:'Error occurred when creating data file'});
          return;
        }    
    }catch(err){
      console.log(err);
      res.status(500).json({ message: 'Error reading data file' });
      return;
    }
  
}

///////////////

const addHeadingsToData = async(req,res,next) =>{
  const dataPageName=req.params.dname;
  const type=req.body.type;
  const newDataHeading=req.body.recentHeading;

  let dataSection;

  try{
    const data = await fs.promises.readFile(dataFilePath);
    dataSection = JSON.parse(data);
    
    let index;
    if(type==="Mannual"){
      console.log("Unicorn");
      index = dataSection.findIndex(data=>data[0]===dataPageName+"M");

    }else if(type==="Excel"){
      console.log("Bull");
      index = dataSection.findIndex(data=>data[0]===dataPageName+"E");
    }
  
      dataSection[index][1]=[...dataSection[index][1],...newDataHeading]
      const newDataSection=JSON.stringify(dataSection);
      try{
        console.log('Ibba addHeadingsToData');
        await fs.promises.writeFile(dataFilePath,newDataSection);
        res.status(200).json({message:'Edited data headings'});

      }catch(err){
        console.log(err);
        res.status(500).json({message:'Error occurred when adding data headings'});
      }
    

  }catch(err){
    console.log(err)
    res.status(500).json({ message: 'Error reading data section' });
  }
}

const removeHeading = async(req,res,next) => {
  const dataPageName=req.params.dname;
  const type=req.body.type;
  const currentHeading=req.body.currentHeading;

  let dataSection;

  try{
    const data = await fs.promises.readFile(dataFilePath);
    dataSection = JSON.parse(data);
    
    let index;
    if(type==="Mannual"){
      console.log("Unicorn");
      index = dataSection.findIndex(data=>data[0]===dataPageName+"M");

    }else if(type==="Excel"){
      console.log("Bull");
      index = dataSection.findIndex(data=>data[0]===dataPageName+"E");
    }
    //dataSection[index][1]=[...dataSection[index][1],...newDataHeading]
    dataSection[index][1]=currentHeading;
      const newDataSection=JSON.stringify(dataSection);
      try{
        await fs.promises.writeFile(dataFilePath,newDataSection);
        res.status(200).json({message:'Removed data headings'});

      }catch(err){
        console.log(err);
        res.status(500).json({message:'Error occurred when removing data headings'});
      }

  }catch(err){
    console.log(err)
    res.status(500).json({ message: 'Error reading data section' });
  }



}

//////////////******** */
const addHeading= async(req,res,next)=>{
  const pageName=req.query.dataPageName;
  
}

const getHeadingsFromData = async(req,res,next) => {
  console.log('running getHeadingsFromData');
  const dataPageName=req.query.dataPageName;
  console.log("Mapping",dataPageName);

  let dataSection;
  try{
    const data = await fs.promises.readFile(dataFilePath);
    dataSection = JSON.parse(data);

    let index;
    if(dataPageName.charAt(dataPageName.length-1)==="M"){
       index = dataSection.findIndex(data=>data[0]===dataPageName);
    }else if(dataPageName.charAt(dataPageName.length-1)==="E"){
       index = dataSection.findIndex(data=>data[0]===dataPageName);
    }
    
    //const index = dataSection.findIndex(data=>data[0]===dataPageName+"M");
    const selectedDataSheetHeadings=dataSection[index][1];
    const headingArray=selectedDataSheetHeadings.map((heading)=>{
      return [heading]
    });
    res.status(200).json({getHeadings:headingArray});
  }catch(err){
    res.status(500).json({ message: 'Error reading data section' });
  }
}

const getDataPageContent = async(req,res,next) => {
  console.log('running getDataPageContent');
  //const dataPageName=req.params.dname;
  const dataPageName=req.query.dataPageName;
  let dataSection;
  try{
    const data = await fs.promises.readFile(dataFilePath);
    dataSection = JSON.parse(data);

    let index;
    if(dataPageName.charAt(dataPageName.length-1)==="M"){
       index = dataSection.findIndex(data=>data[0]===dataPageName);
    }else if(dataPageName.charAt(dataPageName.length-1)==="E"){
       index = dataSection.findIndex(data=>data[0]===dataPageName);
    }
    //const index = dataSection.findIndex(data=>data[0]===dataPageName+"M");
    if(dataSection[index].length>2){
      const dataRecords=dataSection[index];
      dataRecords.splice(0,2);
      res.status(200).json({getDataRecords:dataRecords})
    }else if(dataSection[index].length<=2){
      res.status(200).json({getDataRecords:[]})
    }
  }catch(err){
      res.status(500).json({ message: 'Error reading data section' })
  }
}
 

//edit data pages individually

const editDataPage = async (req,res,next) => {
  console.log('running editDataPage');
  const dataPageName=req.params.dname;
  const newDataContent=req.body.editedData;
  const type=req.body.type;

  console.log("dataPageName: ",dataPageName);
  console.log("Type: ",type);
  console.log("data content: ",newDataContent);

  console.log()

  let dataSection;
  try{
    const data = await fs.promises.readFile(dataFilePath);
    dataSection = JSON.parse(data);

    let index;
    let dataPage;
    let newDataPage;
    if(type==="Mannual"){
      console.log("butterfly Effect");
      index = dataSection.findIndex(data=>data[0]===dataPageName+"M");
      dataPage=dataSection.find(data=>data[0]===dataPageName+"M");
      newDataPage=[dataPageName+"M",dataPage[1],...newDataContent];
    }else if(type==="Excel"){
      console.log("mach");
      index = dataSection.findIndex(data=>data[0]===dataPageName+"E");
      dataPage=dataSection.find(data=>data[0]===dataPageName+"E");
      newDataPage=[dataPageName+"E",dataPage[1],...newDataContent];
    }
    
    dataSection[index]=newDataPage;
    const newDataSection=JSON.stringify(dataSection);
    try{
      console.log('balla editDataPage');
      await fs.promises.writeFile(dataFilePath,newDataSection);
      res.status(200).json({message:'Edited data content'});
    }catch(err){
      console.log(err);
      res.status(500).json({message:'Error occurred when creating data content'});
    }
  }catch(err){
    console.log(err)
    res.status(500).json({ message: 'Error reading data section' });
  }
}

// const deleteDataSheet = (req,res,next) => {
//     const deleteDataSheetName=req.query.dataSheetName;  

//     fs.readFile(dataFilePath, 'utf8', (err, data) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         const dataSection = JSON.parse(data);
//         for(let i=0;i<dataSection.length;i++){
//             if(dataSection[i][0]===deleteDataSheetName){
//                dataSection.splice(i,1);
//             }
//         }
//         fs.writeFile(dataFilePath, JSON.stringify(dataSection), (err) => {
//             if (err) {
//               console.error(err);
//               return;
//             }
//             console.log('Data written to file');
//           });
//         res.status(200);
//         res.json(dataSection);
//       });
      

// }

// exports.deleteDataSheet=deleteDataSheet;
exports.createDataSheetOne=createDataSheetOne;
exports.getPageNames=getPageNames;
exports.editDataPage=editDataPage;
exports.addHeadingsToData=addHeadingsToData;
exports.getHeadingsFromData=getHeadingsFromData;
exports.getDataPageContent=getDataPageContent;
exports.addHeading=addHeading;
exports.removeHeading=removeHeading;