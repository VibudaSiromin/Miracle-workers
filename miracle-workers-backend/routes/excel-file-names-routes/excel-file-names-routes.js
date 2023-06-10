const express=require('express');
const router=express.Router();

const excelControllers=require('../../controllers/excel-controllers/excelNameHandler');
///dataJunction/dataExcel/'+dname+'/excelFileNames
router.get('/dataExcel/excelFileNames',excelControllers.getExcelFileNames);
//router.get('/dataJunction/dataExcel/:dname/getHeading',dataControllers.getHeadingsFromData);
//route for adding excel file names
router.post('/dataJunction/dataExcel/:dname/excelFileNames',excelControllers.addExcelFileNames);

module.exports=router;