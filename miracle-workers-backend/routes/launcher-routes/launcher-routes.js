const express=require('express');
const router=express.Router();

const launcherControllers=require('../../controllers/launcher-controllers/launcher');


//route for editing laoncher page
router.post('/testJunction/testManual/:tname/editLauncher',launcherControllers.editTestPage);
//route for getting launcher content
router.get('/testJunction/testManual/:tname/getLauncherContent',launcherControllers.getLauncherContent);

//route for launcher page
router.post('/launcher', launcherControllers.createLauncher);


module.exports = router;
