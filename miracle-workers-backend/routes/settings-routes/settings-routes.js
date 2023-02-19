const express=require('express');
const router=express.Router();

const commandControllers=require('../../controllers/settings-controllers/commands-controller');
const browserControllers=require('../../controllers/settings-controllers/browsers-controllers')


router.get('/settings/commands',commandControllers.getAllCommands);

router.get('/settings/browsers',browserControllers.getAllBrowsers);



module.exports = router;
