const express=require('express');
const router=express.Router();

const locatorControllers=require('../../controllers/locator-controllers/locator');

//route for getting headings
router.get('/locators/getHeadings',locatorControllers.getHeadings);
//route for getting locator names 
router.get('/locators/getLocatorNames',locatorControllers.getLocatorNames);
//route for getting locators By Page
router.get('/locators/:lname',locatorControllers.getLocatorByPage);
//route for getting no of raws
router.get('/locators/getNoofRaws',locatorControllers.getNoofRaws);


//route for creating locator page

router.post('/locators', locatorControllers.createLocatorByPage);

//route for editing locator page

router.post('/locators/:lname', locatorControllers.editLocatorPage);

//route for deleting locator page

router.delete('/locators/deleteLocator', locatorControllers.deleteLocatorPage);

router.patch('/locators/renamePageName',locatorControllers.ranameLocatorPageName);

//route for getting pages
router.get('/locators',locatorControllers.getPageNames);

module.exports = router;
