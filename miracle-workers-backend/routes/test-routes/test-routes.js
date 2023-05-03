const express=require('express');
const router=express.Router();

const testControllers=require('../../controllers/test-controllers/test');


// router.post('/data',dataControllers.createDataSheet);
router.post('/testJunction/testJson',testControllers.createTestSheet);
// router.post('/dataJunction/data',dataControllers.createDataSheetOne);

router.get('/',testControllers.getPageNames);

module.exports=router;