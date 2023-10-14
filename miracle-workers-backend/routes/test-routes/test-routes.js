const express = require('express');
const router = express.Router();

const testControllers = require('../../controllers/test-controllers/test');


router.delete('/testJunction/testManual/deletePage', testControllers.deleteTestPage);
// route for editiong test page
router.post('/testJunction/testManual/:tname', testControllers.editTestPage);
// router.post('/data',dataControllers.createDataSheet);
router.post('/testJunction/testManual', testControllers.createTestSheet);

//route for getting loopname
router.get('/testPages/getLoopName', testControllers.getLoopName)
//route for getting all the loopnames
router.get('/testPages/getAllLoopNames', testControllers.getAllLoopNames)
//route for getting the headings of a test page
router.get('/testJunction/testManual/:tname/getHeading', testControllers.getHeadingsFromTest);
//route for getting content of a test page
router.get('/testJunction/testManual/:tname', testControllers.getTestPageContent)
//router.post('/testJunction/testManual/:dname', testControllers.editTestPage);
router.patch('/testJunction/renamePageName', testControllers.renameTestPageName);
//route for getting all test data
router.get('/testSuite/getAllTestData', testControllers.getAllTestData);
//'/testJunction/testManual/test02'
router.get('/testPages', testControllers.getTestPageNames);
//get referedDataPages name
router.get('/testSuite/getReferedDataPages', testControllers.getReferedDataPages);
//get referedDataPages name
router.get('/testSuite/getReferedLocatorPages', testControllers.getReferedLocatorPages);
//delete all data
router.delete('/section/delete', testControllers.deleteData);

module.exports = router;