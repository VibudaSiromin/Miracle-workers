const express=require('express');
const router=express.Router();

const dataControllers=require('../../controllers/data-controllers/data');

//route for getting a datasheet

router.get('/',dataControllers.getDataSheetByLinkName);

//route for creating a datasheet

router.post('/',dataControllers.createDataSheet);

//route for editing a datasheet

router.patch('/',dataControllers.editDataSheet);

//route for deleting a datasheet

router.delete('/',dataControllers.deleteDataSheet);

module.exports=router;