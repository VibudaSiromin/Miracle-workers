const express=require('express');
const router=express.Router();

const locatorControllers=require('../../controllers/locator-controllers/locator');

//route for getting all locators

router.get('/locators',locatorControllers.getAllLocators);

//route for getting locator by ID

router.get('/locators/:lid',locatorControllers.getLocatorById);

//route for deleting locator by ID

router.delete('/locators/:lid', locatorControllers.deleteLocatorById);

//route for creating locator 

router.post('/locators', locatorControllers.createdLocator);

module.exports = router;
