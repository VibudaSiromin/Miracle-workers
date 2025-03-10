const express=require('express');
const router=express.Router();

const testControllers=require('../../controllers/test-controllers/test');


router.delete('/testJunction/testManual/deletePage',testControllers.deleteTestPage);
// route for editiong test page
router.post('/testJunction/testManual/:tname',testControllers.editTestPage);
// router.post('/data',dataControllers.createDataSheet);
router.post('/testJunction/testManual',testControllers.createTestSheet);

//route for getting the headings of a test page
router.get('/testJunction/testManual/:tname/getHeading',testControllers.getHeadingsFromTest);
//route for getting content of a test page
router.get('/testJunction/testManual/:tname',testControllers.getTestPageContent)
//router.post('/testJunction/testManual/:dname', testControllers.editTestPage);
router.patch('/testJunction/renamePageName',testControllers.renameTestPageName);

//'/testJunction/testManual/test02'
router.get('/testPages',testControllers.getTestPageNames);

module.exports=router;