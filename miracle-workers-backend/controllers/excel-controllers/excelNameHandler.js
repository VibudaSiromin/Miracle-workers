const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');
// import { useLocation } from "react-router-dom";

// const location=useLocation();
//const dataFilePath=path.join(__dirname,'../../store/data.json');
const excelFileNamesFilePath=path.join(__dirname,'../../store/excelFileNames.json');

const addExcelFileNames = async(req,res,next) => {
    const dataPageName = req.params.dname;
    const uploadedExcelFileName=req.body.fileName;
    
    console.log('XXXXXXXXXXXXXX^^^^^^^^^^^^^^^^^^');


    let excelFileNamesContent;
    try{
        const data = await fs.promises.readFile(excelFileNamesFilePath);
        excelFileNamesContent = JSON.parse(data);
        
        try{
            const newContent=[...excelFileNamesContent,[dataPageName,uploadedExcelFileName]];
            const newContentInJsonFormat=JSON.stringify(newContent);
            await fs.promises.writeFile(excelFileNamesFilePath,newContentInJsonFormat);

        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Error writing excel file content'})
        }

    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error reading excel file content' })
    }

}


const getExcelFileNames = async(req,res,next) => {
    const dataPageName = req.query.dname;
    let excelFileNamesContent;
    try{
        const data = await fs.promises.readFile(excelFileNamesFilePath);
        excelFileNamesContent = JSON.parse(data)     
        const selectedExcelFileName = excelFileNamesContent.map((subArr)=>{
            if(subArr[0]===dataPageName){
                return subArr[1];
            }
        }) 
        console.log('ROOOOLLOOOO',selectedExcelFileName);
        res.status(200).json({excelFileName:selectedExcelFileName});
    }catch(err){
        res.status(500).json({ message: 'Error reading excel file content' })
    }

}


exports.addExcelFileNames=addExcelFileNames;
exports.getExcelFileNames=getExcelFileNames;