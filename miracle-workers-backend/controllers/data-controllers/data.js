const fs = require('fs');
const path = require('path');

const dataFilePath =path.join(__dirname,'dataFile.json');
// controller for fetching datasheets
const getDataSheetByLinkName = (req,res,next)=>{
    const linkName=req.query.DataSheetName;
    console.log('Mari',linkName);
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const DataSection = JSON.parse(data);//dataSection => whole data of the dataFile.json
        const findDataSheet=DataSection.find((dataSheet)=>{//dataSheet => every data sheet has a unique name
            if(dataSheet[0]===linkName){ 
                return dataSheet
            }
        });
        console.log(findDataSheet);
        res.status(200)
        .json(findDataSheet);
      });
   
}

//controller for creating dataSheets

const createDataSheet = (req,res,next) => {
    const {sectionName,linkName,dataRecord} =req.body;
    console.log('SIA');
    const newDataSheet = [linkName,...dataRecord];

    fs.stat(dataFilePath,(err,stats)=>{
        if (err) {
            console.error(err);
            return;
          }
          if (stats.size===0) {
            const dataRecordArr=[newDataSheet]
            fs.writeFile(dataFilePath, JSON.stringify(dataRecordArr), (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log('Data written to file');
              });
              res.status(201);
              res.json(newDataSheet);
          }else{
            fs.readFile(dataFilePath, 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }
                const dataSection = JSON.parse(data);
                for(let i=0;i<dataSection.length;i++){
                  if(linkName===dataSection[i][0]){
                    dataSection[i]=newDataSheet;

                    fs.writeFile(dataFilePath, JSON.stringify(dataSection), (err) => {
                      if (err) {
                        console.error(err);
                        return;
                      }
                      console.log('Data written to file');
                    });
                    res.status(201);
                    res.json(dataSection);
                    return;
                  }
                }
                dataSection.push(newDataSheet);
                console.log('van',dataSection);
                fs.writeFile(dataFilePath, JSON.stringify(dataSection), (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }
                    console.log('Data written to file');
                  });
                res.status(201);
                res.json(dataSection);
        
              });
          }
    })
}

const editDataSheet = (req,res,next) => {
    const {sectionName,linkName,dataRecord} =req.body;
    // const parsedplace =req.body;
    const editedDataSheet = [linkName,...dataRecord];

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const dataSection = JSON.parse(data);
        for(let i=0;i<dataSection.length;i++){
            if(linkName===dataSection[i][0]){
                dataSection[i]=editedDataSheet;

                fs.writeFile(dataFilePath, JSON.stringify(dataSection), (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }
                    console.log('Data written to file');
                  });
        
                res.status(200);
                res.json(dataSection);

                return;
            }
        } 

        // console.log(jsonData);
      });

    
}

const deleteDataSheet = (req,res,next) => {
    const deleteDataSheetName=req.query.dataSheetName;  

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const dataSection = JSON.parse(data);
        for(let i=0;i<dataSection.length;i++){
            if(dataSection[i][0]===deleteDataSheetName){
               dataSection.splice(i,1);
            }
        }
        fs.writeFile(dataFilePath, JSON.stringify(dataSection), (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Data written to file');
          });
        res.status(200);
        res.json(dataSection);
      });
      

}

exports.getDataSheetByLinkName=getDataSheetByLinkName;
exports.createDataSheet=createDataSheet;
exports.editDataSheet=editDataSheet;
exports.deleteDataSheet=deleteDataSheet;