const express=require('express');
const router=express.Router();

const locatorControllers=require('../../controllers/locator-controllers/locator');

//route for getting pages

router.get('/locators',locatorControllers.getPageNames)

//route for getting all locators

// router.get('/locators',locatorControllers.getAllLocators);

//route for getting locators By Page

router.get('/locators/:lname',locatorControllers.getLocatorByPage); 

//route for deleting locator by ID

// router.delete('/locators/:lid', locatorControllers.deleteLocatorById);

//route for creating locator page

router.post('/locators', locatorControllers.createLocatorByPage);

//route for editing locator page

router.post('/locators/:lname', locatorControllers.editLocatorPage);

//route for deleting locator page

router.delete('/locators/:lname', locatorControllers.deleteLocatorPage)


module.exports = router;
