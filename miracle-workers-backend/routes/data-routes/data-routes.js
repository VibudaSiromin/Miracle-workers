const express=require('express');
const router=express.Router();

const dataControllers=require('../../controllers/data-controllers/data');

//route for getting a datasheet

// router.get('/',dataControllers.getDataSheetByLinkName);
//route for adding heading to selected data page
router.post('/dataJunction/data/:dname/addHeading',dataControllers.addHeadingsToData);
router.post('/dataJunction/dataExcel/:dname/addHeading',dataControllers.addHeadingsToData);
//route for getting excel file name
//router.post('/dataJunction/dataExcel/getExcelFileName',dataControllers)

//route for removing heading from selected data page
router.post('/dataJunction/data/:dname/removeHeading',dataControllers.removeHeading);
router.post('/dataJunction/dataExcel/:dname/removeHeading',dataControllers.removeHeading);

//route for getting datasheet headings from a selected data page
router.get('/dataJunction/data/:dname/getHeading',dataControllers.getHeadingsFromData);
router.get('/dataJunction/dataExcel/:dname/getHeading',dataControllers.getHeadingsFromData);
router.get('/data/datasheets/getHeadings',dataControllers.getHeadingsFromData);
//router.get('/dataJunction/dataExcel/:dname/getHeading2',dataControllers.addHeading);

router.get('/data/datasheets/getNoofRaws',dataControllers.getNoofRaws);
//route for getting all data
router.get('/data/getAllData',dataControllers.getAllData);

//route for editing data page
router.post('/dataJunction/data/:dname', dataControllers.editDataPage);

router.post('/dataJunction/dataExcel/:dname',dataControllers.editDataPage);

router.get('/dataExcel/excelFileNames',dataControllers.getExcelFileNames);

//route for get the content of a data page
router.get('/dataJunction/data/:dname',dataControllers.getDataPageContent);
router.get('/dataJunction/dataExcel/:dname',dataControllers.getDataPageContent);

// router.post('/data',dataControllers.createDataSheet);
router.post('/dataJunction/dataExcel',dataControllers.createDataSheetOne);
router.post('/dataJunction/data',dataControllers.createDataSheetOne);
//route for editing a datasheet

//route for deleting data page
router.delete('/dataJunction/deletePage',dataControllers.deleteDataSheet);

//route for getting all available data sheet
router.get('/data/getDatasheets',dataControllers.getPageNames);
router.get('/',dataControllers.getPageNames);

//route for renaming speific data sheet name
router.patch('/dataJunction/renamePageName',dataControllers.renameDataPageName);

module.exports=router; 