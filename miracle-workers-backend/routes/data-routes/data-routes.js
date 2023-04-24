const express=require('express');
const router=express.Router();

const dataControllers=require('../../controllers/data-controllers/data');

//route for getting a datasheet

// router.get('/',dataControllers.getDataSheetByLinkName);
//route for adding heading to selected data page
router.post('/dataJunction/data/:dname/addHeading',dataControllers.addHeadingsToData);

//route for getting datasheet headings from a selected data page
router.get('/dataJunction/data/:dname/getHeading',dataControllers.getHeadingsFromData);

//route for editing data records
router.post('/dataJunction/data/:dname/editDataRecords',dataControllers.editDataRecords);

//route for editing data page
router.post('/dataJunction/data/:dname', dataControllers.editDataPage);

//route for get the content of a data page
router.get('/dataJunction/data/:dname',dataControllers.getDataPageContent);

// router.post('/data',dataControllers.createDataSheet);
router.post('/dataJunction/dataExcel',dataControllers.createDataSheetOne);
router.post('/dataJunction/data',dataControllers.createDataSheetOne);
//route for editing a datasheet

//route for getting all available data sheet

router.get('/',dataControllers.getPageNames);

module.exports=router;