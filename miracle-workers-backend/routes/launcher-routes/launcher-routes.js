const express=require('express');
const router=express.Router();

const launcherControllers=require('../../controllers/launcher-controllers/launcher');

//route for launcher page
router.post('/launcher', launcherControllers.createLauncher);

module.exports = router;
